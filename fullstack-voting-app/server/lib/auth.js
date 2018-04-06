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
  )),

  getUserIP: (req) => {
    if (!req) return null
    
    let ip
    if (req.headers['x-forwarded-for']) {
      ip = req.headers['x-forwarded-for'].split(',').pop()
    } else {
      ip =  req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress
    }
    return ip
  }
}

passport.serializeUser((user, done) => {
  done(null, user.userId)
})

passport.deserializeUser((id, done) => {
  findUserById(id).then(user => {
    done(null, user)
  }).catch(err => {
    done(err)
  })
})

