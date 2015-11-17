let Models = require('../../models'),
    ObjectId = require('mongoose').Types.ObjectId

let add_user_image = function(tags, tag, image_id) {
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
      { $match: { 'tags.name': req.params.tag.toLowerCase() }},
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
      { $match: { 'social.unique_val': req.params.userid, 'tags.name': req.params.tag.toLowerCase() }},
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

  getImageById(req, res) {
    Models.Image.findOne({_id: req.params.id}, (err, image) => {
      Models.Image.getTags(image, () => {
        res.json(image)
      })
    })
  },

  getImageByUniqueId(req, res) {
    Models.Image.findOne({uniqueid: req.params.uniqueid}, (err, image) => {
      Models.Image.getTags(image, () => {
        res.json(image)
      })
    })
  },

  getImageByFilename(req, res) {
    Models.Image.findOne({filename: encodeURIComponent(req.params.filename.toLowerCase())}, (err, image) => {
      Models.Image.getTags(image, () => {
        res.json(image)
      })
    })
  },

  addImage(req, res) {
    Models.User.findOne({ _id: req.session.user_id }, (err, user) => {
      if (user) {
        Models.Image.create({
          url: req.body.url,
          filename: req.body.url.substring(req.body.url.lastIndexOf('/')+1),
          uniqueid: Models.Image.generateUniqueId()
        }, (err, image) => {
          req.body.tags.forEach(tag => {
            add_user_image(user.tags, tag, image._id)
          })

          user.save((err) => {
            if (err) {
              res.status(500).json({ error: err.message })
            } else {
              res.json({ success: true })
            }
          })
        })
      }
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
            }

        Models.Image.create({
          url: 'http://shorttompkins.js.org/gifs/ah%20ah%20ah%20didnt%20say%20the%20magic%20word.gif',
          filename: 'ah%20ah%20ah%20didnt%20say%20the%20magic%20word.gif',
          uniqueid: Models.Image.generateUniqueId()
        }, (err, image) => {
          add_user_image(user.tags, 'nope', image._id)
          add_user_image(user.tags, 'no', image._id)
          add_user_image(user.tags, 'denied', image._id)

          save_user()
        })

        Models.Image.create({
          url: 'http://shorttompkins.js.org/gifs/omnomnomcat.gif',
          filename: 'omnomnomcat.gif',
          uniqueid: Models.Image.generateUniqueId()
        }, (err, image) => {
          add_user_image(user.tags, 'yum', image._id)
          add_user_image(user.tags, 'nomnom', image._id)
          add_user_image(user.tags, 'lunch', image._id)

          save_user()
        })

        Models.Image.create({
          url: 'http://shorttompkins.js.org/gifs/nonono.gif',
          filename: 'nonono.gif',
          uniqueid: Models.Image.generateUniqueId()
        }, (err, image) => {
          add_user_image(user.tags, 'nope', image._id)
          add_user_image(user.tags, 'no', image._id)

          save_user()
        })

        Models.Image.create({
          url: 'http://shorttompkins.js.org/gifs/owned_by_goat.jpg',
          filename: 'owned_by_goat.jpg',
          uniqueid: Models.Image.generateUniqueId()
        }, (err, image) => {
          add_user_image(user.tags, 'owned', image._id)
          add_user_image(user.tags, 'ouch', image._id)

          save_user()
        })

        Models.Image.create({
          url: 'http://shorttompkins.js.org/gifs/dissappointed_panda.gif',
          filename: 'dissappointed_panda.gif',
          uniqueid: Models.Image.generateUniqueId()
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
