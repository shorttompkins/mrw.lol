module.exports = {
  index(req, res) {
    let loggedin = req.session.user_id || false

    res.render('home', {
      layout: false,
      session_id: req.session.id,
      loggedin: loggedin,
      userid: req.session.user_id
    })
  }

}
