# MRW.lol

MRW.lol, a.k.a My Reaction When, is an open-source fullstack JavaScript application. The goal of this project is to act as a main starting point for developers that want to learn more about fullstack JavaScript development.

The application itself is divided into 2 major parts, client and server.

Everything is written using ES2015 (i.e. ES6) with some experimental features as well.

The server is written using Node.js 4.x with the Express framework.  The database layer is MongoDB with Mongoose.

The client is a single page application using React.js with the Flux pattern.  No flux framework is currently being used.

# Getting Started TL;DR:

```bash
$ npm install
```

In separate terminal instances:

```bash
$ webpack
$ monogd
$ npm start
```

```bash
$ open http://localhost:3500
```

_Notes:_ PORT 3500 is the default port of the app, but can be easily overridden using env var i.e. `$ PORT=80 npm start`
MongoDB isn't required to be run locally; you can either use the local Docker container to run MongoDB or you can simply use an external service like MongoLab et al.

## Configuring Social Network Auth

Before you can use the app locally, you need to be able to login (and thus, create a user account).  In order to login, you need to configure the Social Network auth keys with your *OWN*
keys. Edit `/server/config/auth.js` and update each accordingly.

# Global Dependencies

Node.js 4.x is required.

MongoDB is required, although not required to be installed locally.  Edit `server/config/config.env.json` to update the host connection string for your MongoDB instance (if its at MongoLab, for example).  _See the Docker section below if you'd rather use Docker to run containers locally for Node and/or MongoDB._

# Server

The server is a standard Express web app that relies on MongoDB for db stores for the app as well as sessions.  Handlebars for view template rendering.  Mongoose for db schemas and virtuals etc.

Acts as a standard web server as well as serving static routes for the React app(s). Additionally will act as an API for the React client to consume.

## Dependencies

```bash
$ npm install
$ npm start
```

Note that this launches the Node server using the `--use_strict` flag so that ES6 is properly supported (i.e. `let` etc.)

# Client

## Dependencies & Initial Setup

```bash
$ npm install -g webpack
```

```bash
$ npm install
```

## Build Process

```bash
$ webpack
```

Runs Webpack which performs the following:

 * Babel transpiles for ES2015 support
 * Bundles `app.js` to `./server/public/mrw`
 * Transpiles and bundles `main.css` from SASS files
 * ESLint syntax checking

```bash
$ webpack -w
```

_Performs the standard build and runs watchers to perform automatic client rebuilds._

## Using Docker (deployment)

The project has been setup to be easily deployed using Docker.  Simple make commands are included:

 * `make build_node` - builds the Node Docker image (see `Dockerfile`) (mrw.node)
 * `make run_mongodb` - launches a stock MongoDB Docker container (mrw.mongodb)
 * `make run_app` - launches the app via the custom Node Docker container (mrw.app)

Helpful utility commands:

 * `make bash_app` - for bash shell into the node app to run manually (for debugging)
 * `make run_mongodb_local` - for running a local instance of MongoDB (development)
 * `make db_connect` - to connect to the MongoDB server via the Mongo shell
 * `make clean_exited` - to remove any old/stale exited Docker instances

## Docker for Local development

Note that you can also use Docker locally to run and build the web app - you just need [Docker Toolbox](http://docs.docker.com/mac/started/) installed!

In order for the app to point to your local instance of MongoDB, you need to change the `config/config.dev.json` file accordingly:

```json
  "host": "mongodb://192.168.99.100:27017/"
```

Where the IP address used is that of your docker-machine VM.  Then simply run the local MongoDB container and launch the web server locally:

```bash
$ make run_mongodb_local
$ npm start
```

If you don't want to even run the web server locally, you could instead:

```bash
$ make build_node
$ make run_app
$ open http://192.168.99.100
```

A good tip would be to edit your `/etc/hosts` file and insert `192.168.99.100 mrw.lol` so that you can just point your browser to `http://mrw.lol` (and this way your local copies of `config/auth.js` will register.)


# CHANGE LOG

Refer to the [changelog](changelog.md) file.
