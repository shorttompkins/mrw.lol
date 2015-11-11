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
$ gulp
$ monogd
$ npm start
```

```bash
$ open http://localhost:3500
```

## Seed data

Before you can seed data, you need a valid user account.  The easiest way to get one (currently) is to simply point your browser to http://mrw.lol:3500/auth/twitter (or `facebook`, or `google`, or `github`).  *Important Note:* Its best to edit your `/etc/hosts` file and include `127.0.0.1 mrw.lol` so that the social network properly redirects back to the website.

*Second Important Note:* your local `server/config/auth.js` file will need to be updated with the appropriate social network API key/values.

Point your browser to `http://localhost:3500/api/seed` to populate the database with some sample data.

# Global Dependencies

Node.js 4.x is required.

MongoDB is required, although not required to be installed locally.  Edit `server/config/config.env.json` to update the host connection string for your MongoDB instance (if its at MongoLab, for example).

# Server

The server is a standard Express web app that relies on MongoDB for db stores for the app as well as sessions.  Handlebars for view template rendering.  Mongoose for db schemas and virtuals etc.

Acts as a standard web server as well as serving static routes for the React app(s). Additionally will act as an API for the React client to consume.  May also act as an in between for external 3rd party API (to be determined; IMDB, et al);

## Dependencies

```bash
$ npm install
$ npm start
```

Note that this launches the Node server using the `--use_strict` flag so that ES6 is properly supported (i.e. `let` etc.)

# Client

## Dependencies & Initial Setup

```bash
$ npm install -g gulp eslint
```

```bash
$ npm install
```

## Build Process

```bash
$ gulp build
```

Runs gulp which performs the following:

 * clean
 * Browserify
 * Babel transformation (for ES6)
 * bundling to `app.js` & copying to `/server/public/apps/blog/app.js`
 * SASS transpiling to `main.css` & copying to `server/public/apps/blog/main.css`

```bash
$ gulp
```

_Performs the standard build and runs watchers to perform automatic client rebuilds._

## Using Docker (deployment)

The project has been setup to be easily deployed using Docker.  Simple make commands are included:

 * `make build_node` - builds the Node Docker image (see `Dockerfile`) (mrw.node)
 * `make run_mongodb` - launches a stock MongoDB Docker container (mrw.mongodb)
 * `make run_app` - launches the app via the custom Node Docker container (mrw.app)

Helpful utility commands:

 * `make bash_app` - for bash shell into the node app to run manually (for debugging)
 * `make db_connect` - to connect to the local MongoDB server via the Mongo shell
 * `make clean_exited` - to remove any old/stale exited Docker instances


# CHANGE LOG

Refer to the [changelog](changelog.md) file.
