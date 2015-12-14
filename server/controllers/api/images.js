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
    Models.Image.find({}).sort({timestamp: -1}).exec((err, images) => {
      res.json(images)
    })
  },

  listByTag(req, res) {
    Models.User.aggregate([
      { $unwind: '$tags' },
      { $match: { 'tags.name': req.params.tag.toLowerCase() }},
      { $unwind: '$tags.images' },
      { $group: { _id: '1', images: { $addToSet: '$tags.images' }}}
    ], (err, imageids) => {
      if (imageids.length) {
        let ids = imageids[0].images.map(image => new ObjectId(image))
        Models.Image.find({_id: { $in: ids } }, (err, images) => {
          res.json(images)
        })
      } else {
        res.json([])
      }
    })
  },

  listByUserId(req, res) {
    Models.User.aggregate([
      { $match: { '_id': new ObjectId(req.params.userid) }},
      { $unwind: '$tags'},
      { $unwind: '$tags.images' },
      { $group: { _id: '$_id', images: { $addToSet: '$tags.images' }}},
      { $sort: { timestamp: -1 }}
    ], (err, imageids) => {
      if (imageids.length) {
        let ids = imageids[0].images.map(image => new ObjectId(image))
        Models.Image.find({_id: { $in: ids } }, (err, images) => {
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
      { $match: { '_id': new ObjectId(req.params.userid), 'tags.name': req.params.tag.toLowerCase() }},
      { $group: { _id: '$_id', images: { $addToSet: '$tags.images' }}},
      { $sort: { timestamp: -1 }}
    ], (err, imageids) => {
      if (imageids.length) {
        let ids = imageids[0].images.map(image => new ObjectId(image))
        Models.Image.find({_id: { $in: ids } }, (err, images) => {
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
      if (image) {
        let userid = req.params.userid || null
        Models.Image.getTags(image, () => {
          if (userid) {
            image.owner = userid
          }
          res.json(image)
        }, userid)
      } else {
        res.status(404).json({})
      }
    })
  },

  addImage(req, res) {
    const http = require('http'),
        fs = require('fs'),
        path = require('path')

    let uniqueid = Models.Image.generateUniqueId()

    Models.User.findOne({ _id: req.session.user_id }, (err, user) => {
      if (user) {
        const save_image = function(err) {
          if (!err) {
            Models.Image.create({
              url: filename,
              filename: filename,
              uniqueid: uniqueid
            }, (err, image) => {
              req.body.tags.split(',').forEach(tag => {
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
          } else {
            res.status(500).json({ error: 'File upload failed.'})
          }
        }

        let filename, file_url

        if (req.body.uniqueid) {
          // reuse existing image:
          req.body.tags.split(',').forEach(tag => {
            add_user_image(user.tags, tag, req.body._id)
          })

          user.save((err) => {
            if (err) {
              res.status(500).json({ error: err.message })
            } else {
              res.json({ success: true })
            }
          })
        } else if (req.body.url) {
          // download the file:
          filename = uniqueid + '_' + req.body.url.substring(req.body.url.lastIndexOf('/')+1)
          file_url = req.body.url.replace('https://', 'http://')

          let file = fs.createWriteStream(path.join(__dirname, `../../public/upload/${filename}`))

          http.get(file_url, (response) => {
            response.pipe(file)
            file.on('finish', function() {
              file.close(save_image)  // should fire callback here to be sure
            })
          })

        } else {
          file_url = req.file.filename
          filename = `${uniqueid}_${req.file.originalname}`
          // move the file:
          fs.rename(path.join(__dirname, `../../public/upload/temp/${req.file.filename}`),
            path.join(__dirname, `../../public/upload/${uniqueid}_${req.file.originalname}`),
            save_image
          )
        }
      } else {
        res.status(500).json({ error: 'User not logged in.'})
      }
    })
  }
}
