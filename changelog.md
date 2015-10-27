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