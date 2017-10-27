const path = require('path')
const express = require('express')
const app = express()
const port = 50023

const pug = require('pug')
const request = require('request')

require('dotenv').config()

// key = search property in my API, val = search property in Google API
const extraAllowedProps = {
  offset:       'start',
  count:        'num',
  exactTerms:   'exactTerms',
  excludeTerms: 'excludeTerms'
}

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.send(pug.renderFile(path.join(__dirname, '/index.pug')))
})

app.get('/search/*', function (req, res) {
  getGoogle(req.params[0], req.query).then(data => {
    res.setHeader('content-type', 'application/json')
    res.send(data)
  }, err => {
    res.setHeader('content-type', 'application/json')
    res.send(err)
  })
})

app.listen(port, function () {
  console.log(`FCC - Image Search Abstraction Layer: Listening on port ${port}`)
})

function getGoogle(query, props) {
  return new Promise((resolve, reject) => {
    let url = `${process.env.SEARCH_URL}?key=${process.env.API_KEY}&cx=${process.env.SEARCH_ID}&q=${query}`

    let properties = {
      key:  process.env.API_KEY,
      cx:   process.env.SEARCH_ID,
      q:    query
    }
    // Add any additional properties to the search query, while taking into account any possible naming differences
    // that I have for some reason decided to do (e.g. 'start' in the Google API to 'offset' in mine )
    for (let myProp in extraAllowedProps) {
      if (extraAllowedProps.hasOwnProperty(myProp)) {
        if (props[myProp]) properties[extraAllowedProps[myProp]] = props[myProp]
      }
    }

    request({url: url, qs: properties}, (err, res, body) => {
      if (err) reject(err)
      resolve(formatApiData(body))
    })
  })
}

function formatApiData(data) {
  let results = {}
  try {
    results = JSON.parse(data).items
  } catch(err) {
    return { error: err }
  }

  // Cut out unnecessary parts of the results that I don't want.
  return results.map(item => {
    return (({title, link, snippet, pagemap}) => ({title, link, snippet, pagemap}))(item)
  })
}
