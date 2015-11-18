let Models = require('../models')

module.exports = {
  index(req, res) {
    let loggedin = req.session.user_id || false
    let model = {
      layout: false,
      session_id: req.session.id,
      loggedin: loggedin,
      userid: req.session.user_id
    }
    if (req.params.imageid) {
      Models.Image.findOne({uniqueid: req.params.imageid}, (err, image) => {
        model.image = image
        res.render('home', model)
      })
    } else {
      res.render('home', model)
    }
  }

}
