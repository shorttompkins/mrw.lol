module.exports = {
  index(req, res) {
    let loggedin = req.session.user_id || false
    
    res.render('home', {
      title: 'World',
      session_id: req.session.id,
      testing: req.session.testing,
      version: req.app.get('config').version,
      loggedin: loggedin,
      userid: req.session.user_id
    })
  }

}
