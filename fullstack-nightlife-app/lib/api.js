const express = require('express')
const fetch = require('isomorphic-unfetch')
const router = express.Router()

const {
  findOrCreateBar,
  findUserByID,
  setUserGoingStatus
} = require('./db')

const {
  DEFAULT_API_QUERY_LIMIT,
  DEFAULT_API_OPTIONS
} = require('./consts')
const apiEndpoint = 'https://api.yelp.com/v3/businesses'

function isValidUser (twitterID, secret) {
  return new Promise((resolve, reject) => {
    if (!twitterID || !secret) reject(new Error('no user credentials provided'))

    findUserByID(twitterID, secret)
      .then(user => {
        if (!user) reject(new Error('not a valid logged in user'))
        resolve(user)
      })
      .catch(reject)
  })
}

router.get('/bar/:id', (req, res) => {
  fetch(`${apiEndpoint}/${req.params.id}`, DEFAULT_API_OPTIONS)
    .then(yelp => yelp.json())
    .then(json => res.json(json))
})

router.get('/bar/:id/reviews', (req, res) => {
  fetch(`${apiEndpoint}/${req.params.id}/reviews`, DEFAULT_API_OPTIONS)
    .then(yelp => yelp.json())
    .then(json => res.json(json))
})

router.get('/bars', (req, res) => {
  if (!req.query || !req.query.location) {
    res.json({
      error: 'To search by bars you need to input a location'
    })
  } else {
    let parameters = 'categories=bars'
    parameters += `&location=${req.query.location}`
    parameters += `&limit=${DEFAULT_API_QUERY_LIMIT}`
    parameters += `&offset=${req.query.offset ? req.query.offset * DEFAULT_API_QUERY_LIMIT : 0}`

    fetch(`${apiEndpoint}/search?${parameters}`, DEFAULT_API_OPTIONS)
      .then(yelp => yelp.json())
      .then(json => formatYelpData(json))
      .then(data => res.json(data))
  }
})

router.get('/schedule/bar/:id', (req, res) => {
  findOrCreateBar(req.params.id)
    .then(bar => res.json(bar.schedule))
})

router.get('/setGoing', (req, res) => {
  isValidUser(req.query.twitterID, req.query.secret)
    .then(user => {
      return setUserGoingStatus(
        req.query.dateGoing,
        req.query.barId,
        user.twitterID,
        req.query.going === 'true')
    })
    .then(() => {
      res.json({ message: 'success setting going status' })
    })
    .catch(error => {
      res.json({ error: error.message })
    })
})

router.get('*', (req, res) => {
  res.json({
    error: 'The provided api route was not recognized.'
  })
})

module.exports = router

const formatYelpData = data => {
  let newData = {}
  return new Promise((resolve, reject) => {
    newData.bars = data.businesses
    newData.total = data.total

    Promise.all(newData.bars.map(bar => {
      return findOrCreateBar(bar.id)
        .then(barInfo => { bar.schedule = barInfo.schedule })
    })).then(() => {
      resolve(newData)
    })
  })
}
