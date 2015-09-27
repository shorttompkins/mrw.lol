module.exports = {
  index(req, res) {
    req.session.testing = 'this is a test'
    res.render('about')
  }
}
