const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
const { findOrCreateUser, findUserById } = require('../db.js')

module.exports = {
  auth: passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: '/auth/twitter/callback'
  },
    function (token, tokenSecret, profile, done) {
      findOrCreateUser(profile).then(user => {
        done(null, user)
      }).catch(err => {
        done(err)
      })
    }
  ))
}

passport.serializeUser((user, done) => {
  console.log('are we serializing?', user)
  done(null, user.userId)
})

passport.deserializeUser((id, done) => {
  console.log('deserializeUser called', id)
  findUserById(id).then(user => {
    done(null, user)
  }).catch(err => {
    done(err)
  })
})

