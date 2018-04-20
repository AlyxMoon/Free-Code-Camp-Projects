const express = require('express')
const fetch = require('isomorphic-unfetch')
const router = express.Router()

const {
  DEFAULT_API_QUERY_LIMIT,
  DEFAULT_API_OPTIONS
} = require('./consts')
const apiEndpoint = 'https://api.yelp.com/v3/businesses'

router.get('/bar/:id', (req, res) => {
  fetch(`${apiEndpoint}/${req.params.id}`, DEFAULT_API_OPTIONS)
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
      .then(json => res.json(json))
  }
})

router.get('*', (req, res) => {
  res.json({
    error: 'The provided api route was not recognized.'
  })
})

module.exports = router
