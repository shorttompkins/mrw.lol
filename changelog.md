# CHANGE LOG

## 2015-12-2
- Fix User tags for logged in users - on image display screen and image list screen (user profile)

## 2015-11-26
- Happy Thanksgiving!  Added user avatar and user profile scree.
- Lots of cleanup/refactoring.

## 2015-11-23
- Added live preview on Add Image screen, improved visual indicators of upload status (i.e. loading spinner, success checkmark and failure x)
- Quick Add existing images - just goto image details and hit the `+ Add` button to add an existing image with your own tags!

## 2015-11-22
- Added support for file uploads!
- Additionally, when a URL is used for an image, that image is downloaded automatically by the server and stored (like a file upload)
- Tweaked the Docker stuff so it caches better
- Included volume mount for Docker so that the `public/upload` is saved on the server and not lost between Docker instances.

## 2015-11-17
- Moved meta og:image url tag to render on the server instead of the React client
- Fixed broken `make db_connect`
- Updated README

## 2015-11-16
- Include unique list of tags on the image details screen.  Each tag is linked to a tag search.
- Include master list of all tags on the homepage. (Also linked to tag search.)
- Updated the Mongoose Image model to include virtual for tags as well as a few helpful static methods (loadTags, generateUniqueId).

## 2015-11-12
- You can now add an image!  For now it only works via URL, and even then just saves the URL to the db.  Next release will see auto downloading of the URL and saving locally as well as File Upload (attachment) support!

## 2015-11-10
- Remove Bootstrap dependency - wasn't a huge fan and it wasn't really giving us much other than bloated HTML and a few nicities.
- Include normalize.css
- Include login module Components and logic
- Include specific Image Component page and necessary getImageById/Filename API endpoints

## 2015-11-3
- Swap out the `PostsList` with `ImagesList` Component on the homepage and display a collection of Images via a sample "Card" component
- Update the Actions, Constants, and Stores to support Images (replacing Posts)
- Include search by tag from the Header Component
- Include a new `util/history` module for easily reusing react-router's history (using `location.pushState()` from within a component, etc)

## 2015-11-3
- Include a few more helpful make commands including `db_connect` and `bash_app`

## 2015-11-2
- More Docker setup/fixes stuff. A few tiny tweaks because the steps in the Dockerfile will fail randomly (npm install) on Digital Ocean and its super frustrating but there also seems to be no logical reason.
- Pushed the repo to a Digital Ocean instance and it should be live at http://mrw.lol

## 2015-10-30
- Dockerized the project!  Now the project can easily be run within a Docker container and use a linked MongoDB container as well.

## 2015-10-27
- Swapped out the data Models and Schemas to support the mrw.lol needs (i.e. Images instead of Posts, etc.)
- Included new API endpoints for image queries - by user, by tag, etc.

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
