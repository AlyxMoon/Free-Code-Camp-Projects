const express = require('express')
const app = express()
const port = 50020

const pug = require('pug')
const convert = require('./convert.js')

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.send(pug.renderFile('index.pug'))
})

app.get('/:timestamp', function (req, res) {
  res.setHeader('content-type', 'application/json')
  res.send(convert(req.params.timestamp))
})

app.listen(port, function () {
  console.log(`FCC - Timestamp Microservice: Listening on port ${port}`)
})
