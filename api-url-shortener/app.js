const path = require('path')
const express = require('express')
const app = express()
const port = 50022

const pug = require('pug')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.send(pug.renderFile(path.join(__dirname, '/index.pug')))
})

app.get('/add/*', function (req, res) {
  console.log(`Attempting to add url: ${req.params[0]}`)
  const reply = {
    original_url: 'https://www.google.com',
    short_url: 'http://freecodecamp.allistermoon.com/go/SzExx75S'
  }

  res.setHeader('content-type', 'application/json')
  res.send(reply)
})

app.get('/go', function (req, res) {
  res.redirect('https://www.google.com')
})

app.listen(port, function () {
  console.log(`FCC - URL Shortener Microservice: Listening on port ${port}`)
})
