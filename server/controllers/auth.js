let passport = require('passport'),
    Models = require('../models'),
    config = require('../config/auth'),
    passport_strategies = {
      github: require('passport-github2').Strategy,
      facebook: require('passport-facebook').Strategy,
      twitter: require('passport-twitter').Strategy,
      google: require('passport-google-oauth').OAuth2Strategy
    }

let handler = (accessToken, refreshToken, profile, done) => {
  let uniqueVal, avatar = ''

  switch(profile.provider) {
    case 'facebook':
      uniqueVal = profile.emails[0].value
      avatar = profile.photos[0].value
      break
    case 'twitter':
      uniqueVal = profile.username
      avatar = profile.photos[0].value
      break
    case 'google':
      uniqueVal = profile.emails[0].value
      avatar = profile.photos[0].value
      break
    case 'github':
      uniqueVal = profile.emails[0].value
      break
  }

  let searchQuery = { uniqueVal: uniqueVal },
      updates = { name: profile.displayName, networkID: profile.id, provider: profile.provider, uniqueVal: uniqueVal, accessToken: accessToken, avatar: avatar },
      options = { upsert: true }

  Models.User.findOneAndUpdate(searchQuery, updates, options, (err, user) => {
    if (err) {
      return done(err)
    } else {
      return done(null, user)
    }
  })
}

function init() {
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })
  passport.deserializeUser(function(id, done) {
    Models.User.findById(id, function (err, user) {
      done(err, user)
    })
  })
}

module.exports = function(strategy) {
  passport.use(new passport_strategies[strategy](config[strategy], handler))
  init()
  return passport
}
