var controllers = require('./controllers'),
    api = require('./controllers/api')

module.exports.initialize = function(app, router) {

  // ** BASIC WEB PAGES **
  router.get('/', controllers.home.index)
  router.get('/about', controllers.about.index)


  // ** APPS **
  router.get('/apps/blog*', controllers.apps.blog)


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
