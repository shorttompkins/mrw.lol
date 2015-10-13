# React App

Experimental full stack ES6 React/Flux application.  Uses my own flavor of file organization/structure/architecture based on reading ~100 articles and videos etc.

Currently its a blog, sort of, but may change.

Node 4.x, Express 4.x, MongoDB & Mongoose, React & Flux

# TL;DR:

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

Runs gulp in watch mode, which will watch for changes and perform a Browserify transformation process.  This includes:

 * clean
 * Browserify
 * Babel transformation (for ES6)
 * bundling to `app.js` & copying to `/server/public/apps/blog/app.js`

```bash
$ gulp
```

_Performs the standard build and runs watchers to perform automatic client rebuilds._
