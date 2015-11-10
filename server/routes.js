var controllers = require('./controllers'),
    api = require('./controllers/api'),
    auth = require('./controllers/auth.js')

module.exports.initialize = function(app, router) {
  // ** BASIC WEB PAGES **
  router.get('/about', controllers.about.index)

  // ** AUTHENTICATION **
  function authHandler(req, res) {
    req.session.user_id = req.user._id
    res.redirect('/')
  }
  router.get('/auth/twitter', auth('twitter').authenticate('twitter'))
  router.get('/auth/twitter/callback', auth('twitter').authenticate('twitter', { failureRedirect: '/' }), authHandler)

  router.get('/auth/facebook', auth('facebook').authenticate('facebook', { scope: 'email' }))
  router.get('/auth/facebook/callback', auth('facebook').authenticate('facebook', { failureRedirect: '/' }), authHandler)

  router.get('/auth/github', auth('github').authenticate('github', { scope: [ 'user:email' ] }))
  router.get('/auth/github/callback', auth('github').authenticate('github', { failureRedirect: '/' }), authHandler)

  router.get('/auth/google', auth('google').authenticate('google', { scope: [ 'profile', 'email' ] }))
  router.get('/auth/google/callback', auth('google').authenticate('google', { failureRedirect: '/' }), authHandler)

  router.get('/auth/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
  })

  // ** API **

  // IMAGES:
  router.get('/api/images', api.images.list)
  router.get('/api/images/:tag', api.images.listByTag)

  //router.get('/api/image/:id', api.images.getImageById)
  router.get('/api/image/:filename', api.images.getImageByFilename)

  router.get('/api/users/:userid/images', api.images.listByUserId)
  router.get('/api/users/:userid/images/:tag', api.images.listByUserIdTag)


  // SEED DATA:
  router.get('/api/seed', api.images.seed)


  // Every other route defaults to the homepage (because of SPA):
  router.get('/*', controllers.home.index)

  app.use('/', router)
}
