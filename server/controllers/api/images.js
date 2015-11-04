let Models = require('../../models'),
    ObjectId = require('mongoose').Types.ObjectId

module.exports = {
  list(req, res) {
    Models.Image.find({}, (err, images) => {
      // to do: would be nice to append list of tags associated with this image
      res.json(images)
    })
  },

  listByTag(req, res) {
    Models.User.aggregate([
      { $unwind: '$tags' },
      { $unwind: '$tags.images' },
      { $match: { 'tags.name': req.params.tag }},
      { $group: { _id: '$_id', images: { $addToSet: '$tags.images' }}}
    ], (err, imageids) => {
      if (imageids.length) {
        let ids = imageids[0].images.map(image => new ObjectId(image))
        Models.Image.find({_id: { $in: ids } }, (err, images) => {
          // to do: would be nice to append list of tags associated with this image
          res.json(images)
        })
      } else {
        res.json([])
      }
    })
  },

  listByUserId(req, res) {
    Models.User.aggregate([
      { $unwind: '$tags'},
      { $unwind: '$tags.images' },
      { $match: { 'social.unique_val': req.params.userid }},
      { $group: { _id: '$_id', images: { $addToSet: '$tags.images' }}}
    ], (err, imageids) => {
      if (imageids.length) {
        let ids = imageids[0].images.map(image => new ObjectId(image))
        Models.Image.find({_id: { $in: ids } }, (err, images) => {
          // to do: would be nice to append list of tags associated with this image
          res.json(images)
        })
      } else {
        res.json([])
      }
    })
  },

  listByUserIdTag(req, res) {
    Models.User.aggregate([
      { $unwind: '$tags' },
      { $unwind: '$tags.images' },
      { $match: { 'social.unique_val': req.params.userid, 'tags.name': req.params.tag }},
      { $group: { _id: '$_id', images: { $addToSet: '$tags.images' }}}
    ], (err, imageids) => {
      if (imageids.length) {
        let ids = imageids[0].images.map(image => new ObjectId(image))
        Models.Image.find({_id: { $in: ids } }, (err, images) => {
          // to do: would be nice to append list of tags associated with this image
          res.json(images)
        })
      } else {
        res.json([])
      }
    })
  },

  getImageByFilename(req, res) {
    console.log(encodeURIComponent(req.params.filename))
    Models.Image.findOne({filename: encodeURIComponent(req.params.filename)}, (err, image) => {
      // to do: would be nice to append list of tags associated with this image
      res.json(image)
    })
  },

  seed(req, res) {
    Models.User.find({}, (err, users) => {
      if (users.length > 0) {
        let user = users[0],
            image_count = 0,
            save_user = function() {
              image_count++
              if (image_count === 5) {
                user.save()
              }
            },
            add_user_image = function(tags, tag, image_id) {
              let tagged = false
              for(let t = 0; t < tags.length; t += 1) {
                if (tags[t].name === tag) {
                  tagged = true
                  tags[t].images.push(image_id)
                }
              }
              if (!tagged) {
                tags.push({name: tag, images: [image_id]})
              }
            }

        Models.Image.create({
          url: 'http://shorttompkins.js.org/gifs/ah%20ah%20ah%20didnt%20say%20the%20magic%20word.gif',
          filename: 'ah%20ah%20ah%20didnt%20say%20the%20magic%20word.gif'
        }, (err, image) => {
          add_user_image(user.tags, 'nope', image._id)
          add_user_image(user.tags, 'no', image._id)
          add_user_image(user.tags, 'denied', image._id)

          save_user()
        })

        Models.Image.create({
          url: 'http://shorttompkins.js.org/gifs/omnomnomcat.gif',
          filename: 'omnomnomcat.gif'
        }, (err, image) => {
          add_user_image(user.tags, 'yum', image._id)
          add_user_image(user.tags, 'nomnom', image._id)
          add_user_image(user.tags, 'lunch', image._id)

          save_user()
        })

        Models.Image.create({
          url: 'http://shorttompkins.js.org/gifs/nonono.gif',
          filename: 'nonono.gif'
        }, (err, image) => {
          add_user_image(user.tags, 'nope', image._id)
          add_user_image(user.tags, 'no', image._id)

          save_user()
        })

        Models.Image.create({
          url: 'http://shorttompkins.js.org/gifs/owned_by_goat.jpg',
          filename: 'owned_by_goat.jpg'
        }, (err, image) => {
          add_user_image(user.tags, 'owned', image._id)
          add_user_image(user.tags, 'ouch', image._id)

          save_user()
        })

        Models.Image.create({
          url: 'http://shorttompkins.js.org/gifs/dissappointed_panda.gif',
          filename: 'dissappointed_panda.gif'
        }, (err, image) => {
          add_user_image(user.tags, 'facepalm', image._id)
          add_user_image(user.tags, 'dissappointed', image._id)

          save_user()
        })

      } else {
        console.log(`no users found!`)
      }
    })

    res.send('Success.')
  }
}
