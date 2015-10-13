# React App

Forked from the `react-sandbox` app.  Building this out into a more full fledged
fullstack application.

Node 4.x, Express 4.x, MongoDB/Mongoose, React - all ES6

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

Point your browser to `http://localhost:3500/api/seed` to populate the database
with some sample data.

# Global Dependencies

The project is configured to use `eslint` so it is recommended that you install that:

```bash
$ npm install -g eslint
```

# Server

The server is a standard Express web app that relies on MongoDB for db stores for
the app as well as sessions.  Handlebars for view template rendering.

Acts as a standard web server as well as serving static routes for the React app(s).
Additionally will act as an API for the React client to consume.  May also act as
an in between for external 3rd party API (to be determined; IMDB, et al);

## Dependencies

```bash
$ npm install
$ npm start
```

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
$ gulp build
```

Runs gulp in watch mode, which will watch for changes and perform a Browserify
transformation process.  This includes:

 * clean
 * browserify
 * babel transformation (for ES6)
 * bundling to `app.js`

```bash
$ gulp
```

_Will run with watchers as well so client rebuilds._

### Destination

The client app builds and copies to the `public/apps/myapp/` folder.

# Server

Ensure that the local MongoDB server is running:

```bash
$ mongod
```

Then in a separate terminal instance, launch the Node server:

```bash
$ npm start
```

Note that this launches the Node server using the `--use_strict` flag so that
ES6 can be properly supported (i.e. `let` etc.)
