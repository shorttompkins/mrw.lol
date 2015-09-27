module.exports = {
  index(req, res) {

    res.render('home', {
      title: 'World',
      session_id: req.session.id,
      testing: req.session.testing,
      version: req.app.get('config').version
    })
  }

}
