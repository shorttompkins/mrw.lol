var controllers = require('./controllers'),
    api = require('./controllers/api')

module.exports.initialize = function(app, router) {

  router.get('/', controllers.home.index)
  router.get('/about', controllers.about.index)

  // static route mapping for app routes:
  router.get('/apps/myapp*', controllers.apps.myapp)

  // ** API **
    // POSTS:
  router.get('/api/posts', api.posts.list)
  router.get('/api/posts/:id', api.posts.getById)
  router.post('/api/posts', api.posts.insert)

    // SEED DATA:
  router.get('/api/seed', api.posts.seed)

  app.use('/', router)
}
