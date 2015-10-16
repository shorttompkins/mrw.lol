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


# CHANGE LOG
Going to try to keep track as much as possible major (and minor) changes I make to this repo as I go.

## 2015-10-16
- Introduced first `Stateless Functional Component` with the Brief component.  These were introduced with React 0.14.

## 2015-10-15
- Introduced `utils` that contains `baseStore` extender which wraps a Store with the common convention for EventEmitting and all the other juicy boilerplate.
- Introduced `connectToStores` as a `util` that wraps Components in a Higher Order Component that extends it by providing a lot of the Store watching boilerplate.  Learn more here: http://bit.ly/1abPkrP.
- Refactored the wrapper Components within `routes` to use the `connectToStores` stuff instead so that we can completely eliminate them altogether.

## 2015-10-14
- Brought in `keyMirror` to make maintaining Constants easier (and cleaner).

## 2015-10-13
- Introduced Gulp SASS for dynamic transpiled CSS stylesheets
- Created Comments section and New Comment posting form/functionality
- Include seed comments with sample data
