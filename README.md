# React App

Forked from the `react-sandbox` app.  Building this out into a more full fledged
fullstack application.

Node 4.x, Express 4.x, MongoDB/Mongoose, React - all ES6

# Server

The server is a standard Express web app that relies on MongoDB for db stores for
the app as well as sessions.  Handlebars for view template rendering.

Acts as a standard web server as well as serving static routes for the React app(s).
Additionally will act as an API for the React client to consume.  May also act as
an inbetween for external 3rd party API (to be determined; IMDB, et al);

# Client

## Dependencies & Initial Setup

```bash
$ npm install -g gulp
```

```bash
$ npm install
```

## Build Process

```bash
$ gulp
$ open http://localhost:3500
```

Runs gulp in watch mode, which will watch for changes and perform a Browserify
transformation process.  This includes:

 * clean
 * browserify
 * babel transformation (for ES6)
 * bundling to `app.js`
 * watchers


### Client
