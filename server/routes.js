var controllers = require('./controllers')

module.exports.initialize = function(app, router) {

  router.get('/', controllers.home.index)
  router.get('/about', controllers.about.index)

  // static route mapping for app routes:
  router.get('/apps/myapp*', controllers.apps.myapp)

  app.use('/', router)
}
