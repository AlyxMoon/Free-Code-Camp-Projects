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

router.get('/bar/:id/reviews', (req, res) => {
  fetch(`${apiEndpoint}/${req.params.id}/reviews`, DEFAULT_API_OPTIONS)
    .then(yelp => yelp.json())
    .then(json => res.json(json))
})

router.get('/bars', (req, res) => {
  console.log('Hit the bars api route')
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

    console.log(newData)
    resolve(newData)
  })
}
