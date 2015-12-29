let Models = require('../models'),
    ObjectId = require('mongoose').Types.ObjectId

module.exports = {
  index(req, res) {
    let loggedin = req.session.user_id || false
    let model = {
      layout: false,
      session_id: req.session.id,
      loggedin: loggedin,
      userid: req.session.user_id
    }

    if (req.app.get('config')['hot-reload']) {
      model.hotReload = 'http://localhost:8080'
    }

    if (req.params.imageid) {
      Models.Image.findOne({uniqueid: req.params.imageid}, (err, image) => {
        model.image = image
        res.render('home', model)
      })
    } else {
      res.render('home', model)
    }
  },
  randomTag(req, res) {
    Models.User.aggregate([
      { $unwind: '$tags' },
      { $unwind: '$tags.images' },
      { $match: { 'tags.name': req.params.tag.toLowerCase() }},
      { $group: { _id: '$_id', images: { $addToSet: '$tags.images' }}},
      { $sort: { timestamp: -1 }}
    ], (err, imageids) => {
      if (imageids.length) {
        let ids = imageids[0].images.map(image => new ObjectId(image)),
            rand = Math.floor(Math.random()*ids.length)

        Models.Image.findOne({_id: ids[rand]}, (err, image) => {
          res.redirect(`/image/${image.uniqueid}`)
          //res.redirect(`${req.app.get('config').image_root_url}${image.url}`)
        })
      }
    })
  },
  randomTagByUserId(req, res) {
    Models.User.aggregate([
      { $unwind: '$tags' },
      { $unwind: '$tags.images' },
      { $match: { '_id': new ObjectId(req.params.userid), 'tags.name': req.params.tag.toLowerCase() }},
      { $group: { _id: '$_id', images: { $addToSet: '$tags.images' }}},
      { $sort: { timestamp: -1 }}
    ], (err, imageids) => {
      if (imageids.length) {
        let ids = imageids[0].images.map(image => new ObjectId(image)),
            rand = Math.floor(Math.random()*ids.length)

        Models.Image.findOne({_id: ids[rand]}, (err, image) => {
          res.redirect(`/image/${image.uniqueid}`)
        })
      }
    })
  }
}
