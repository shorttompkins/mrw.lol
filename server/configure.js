'use strict'

var path = require('path'),
    express = require('express'),
    routes = require('./routes'),
    //apiHelper = require('../api/helper'),
    fs = require('fs'),
    middleware = require('./middleware'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(middleware.session)

module.exports = function(app, config) {
  if (config === null) { config = {} }

  app.use(middleware.session({
    secret: 'SECRETHERE',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }))

  app.set('views', __dirname + '/views')
  var hbs = middleware.exphbs.create({
    extname: '.html',
    defaultLayout: 'layout',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: [app.get('views') + '/partials']
    //helpers: require('../helpers/handlebars')
  })
  app.engine('html', hbs.engine)
  app.set('view engine', 'html')

  app.enable('trust proxy')

  app.use(middleware.morgan('dev'))
  app.use(middleware.sanitizer())
  app.use(middleware.bodyParser.urlencoded({ extended: false }))
  app.use(middleware.bodyParser.json())
  app.use(middleware.methodOverride())
  app.use(middleware.cookieParser('SECRETHERE'))

  app.use('/public/', express['static'](path.join(__dirname, './public')))

  switch(app.get('env')) {
    case 'dev':
      app.use(middleware.errorHandler({
        dumpExceptions: true,
        showStack: true
      }))
  }

  app.set('config', config)

  //apiHelper.configure(config);

  routes.initialize(app, new express.Router())

  // Create any folders the app requires in case they dont exist yet:
  fs.exists(path.join(__dirname, './public/upload/temp'), (exists) => {
    if (!exists) {
      fs.mkdir(path.join(__dirname, './public/upload'), () => {
        fs.mkdir(path.join(__dirname, './public/upload/temp'))
      })
    }
  })

  console.log('Server configured.')

  return app
}
