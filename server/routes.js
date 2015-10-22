var controllers = require('./controllers'),
    api = require('./controllers/api'),
    auth = require('./controllers/auth.js')

module.exports.initialize = function(app, router) {

  // ** BASIC WEB PAGES **
  router.get('/', controllers.home.index)
  router.get('/about', controllers.about.index)


  // ** APPS **
  router.get('/apps/blog*', controllers.apps.blog)

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

  // POSTS:
  router.get('/api/posts', api.posts.list)
  router.get('/api/posts/:id', api.posts.getById)
  router.get('/api/posts/:id/comments', api.comments.getCommentsByPostId)
  router.post('/api/posts/:id/comments', api.comments.createNewComment)

  // SEED DATA:
  router.get('/api/seed', api.posts.seed)

  app.use('/', router)
}
