const path = require('path')
const express = require('express')
const app = express()
const port = 50023

const pug = require('pug')
const request = require('request')

require('dotenv').config()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.send(pug.renderFile(path.join(__dirname, '/index.pug')))
})

app.get('/search/*', function (req, res) {
  getGoogle(req.params[0]).then(data => {
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

function getGoogle(query) {
  return new Promise((resolve, reject) => {
    let url = `${process.env.SEARCH_URL}?key=${process.env.API_KEY}&cx=${process.env.SEARCH_ID}&q=${query}`

    request.get(url, (err, res, body) => {
      if (err) reject(err)
      resolve(body)
    })
  })
}