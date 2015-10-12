'use strict'

let express = require('express'),
    configure = require('./configure'),
    _ = require('underscore'),
    mongoose = require('mongoose'),
    path = require('path'),
    app = express()

let packageRoot = __dirname

let pathOf = function(file) {
  return path.join(packageRoot, file)
}

let paths = {
  root: packageRoot,
  'package': pathOf('../package.json'),
  config: pathOf(`config/config.${process.env.NODE_ENV}.json`),
  production: ''
}

let config = require(paths.config)
let pkg = require(paths.package)

config = _.extend({}, _.pick(pkg, 'name', 'version'), config)

app.set('port', process.env.PORT || config.port || 5500)

// connect to the db server:
mongoose.connect(config.mongodb.host)
mongoose.connection.on('open', () => {
  console.log('MongoDB connected.')

  // configure the server after MongoDB has connected:
  app = configure(app, config)

  // boot up the server:
  let server = app.listen(app.get('port'), () => {
    console.log(`Server listening at http://localhost:${app.get('port')}`)
  })
})
