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

## 2015-10-26
- Renamed the repo to officially represent MRW.lol

## 2015-10-24
- Introduced Bootstrap into the project, so it looks half decent
- Migrated the app so that it loads as the homepage of the website.  The website itself can still serve static pages via specific routes.  Anything else defaults to the homepage (for SPA handling).
- Started converting the app to use "MRW" to fit the end goal of the actual website (i.e. http://mrw.lol)

## 2015-10-22
- Introduced Passport.js for Social Networking login/registration
- Introduced UserModel (to support Passport)
- Basic static CSS for main website pages/layout
- .gitignore API credentials/keys/secrets (because they are a secret!)

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
