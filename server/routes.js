var controllers = require('./controllers'),
    api = require('./controllers/api'),
    auth = controllers.auth,
    path = require('path'),
    upload = require('./middleware').multer({ dest: path.join(__dirname, './public/upload/temp')})

module.exports.initialize = function(app, router) {
  // ** BASIC PAGES **
  router.get('/about', controllers.about.index)
  router.get('/image/:imageid', controllers.home.index)
  router.get('/random/:tag', controllers.home.randomTag)
  router.get('/random/:userid/:tag', controllers.home.randomTagByUserId)

  // ** AUTHENTICATION **
  function authHandler(req, res) {
    req.session.user_id = req.user._id
    const hour = 3600000
    req.session.cookie.maxAge = 14 * 24 * hour
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
  router.get('/api/image/:uniqueid', api.images.getImageByUniqueId)
  router.post('/api/image', upload.single('file'), api.images.addImage)

  // ** USERS **
  router.get('/api/users/:userid', api.users.getUserById)
  router.get('/api/users/:userid/images', api.images.listByUserId)
  router.get('/api/users/:userid/tags', api.tags.getTagsByUserId)
  router.get('/api/users/:userid/:tag', api.images.listByUserIdTag)

  // ** TAGS **
  router.get('/api/tags', api.tags.getTags)
  router.get('/api/users/:userid/tags/:imageid', api.tags.getTagsByUserIdImageId)


  // Every other route defaults to the homepage (because of SPA):
  router.get('/*', controllers.home.index)

  app.use('/', router)
}
