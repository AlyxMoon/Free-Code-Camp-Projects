const express = require('express')
const router = express.Router()
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

const { findOrCreateUser, findUserByID } = require('./db')

const auth = passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: '/auth/twitter/callback'
}, (token, tokenSecret, profile, done) => {
  findOrCreateUser(profile)
    .then(user => done(null, user))
    .catch(done)
}))

passport.serializeUser((user, done) => {
  done(null, user.twitterID)
})

passport.deserializeUser((id, done) => {
  findUserByID(id)
    .then(user => done(null, user))
    .catch(done)
})

router.get('/twitter', (req, res) => {
  auth.authenticate('twitter')(req, res)
})

router.get('/twitter/callback',
  auth.authenticate('twitter'),
  (req, res) => {
    if (req.cookies && req.cookies.authRedirect) {
      res.redirect(req.cookies.authRedirect)
    } else {
      res.redirect('/')
    }
  }
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/user', (req, res) => {
  res.json({ user: req.user })
})

module.exports = router
