const path = require('path')
const express = require('express')
const app = express()
const port = 50021

const pug = require('pug')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.send(pug.renderFile(path.join(__dirname, '/index.pug')))
})

app.get('/api', function (req, res) {
  res.setHeader('content-type', 'application/json')
  res.send(parseRequest(req))
})

app.get('/test', function (req, res) {
  res.setHeader('content-type', 'application/json')
  res.send(req.headers)
})

app.listen(port, function () {
  console.log(`FCC - Request Header Parser: Listening on port ${port}`)
})

function parseRequest(req) {
  const result = {}
  const langs = req.get('Accept-Language')
  const userAgents = req.get('User-Agent')
  const proxyIP = req.get('X-Real-IP')

  result.ipaddress = proxyIP ? proxyIP : req.ip
  result.language = langs.slice(0, langs.indexOf(',')) // Just get first accepted language
  result.software = userAgents.slice(userAgents.indexOf('(') + 1, userAgents.indexOf(')')) // Get first relevant part
  result.queries = JSON.stringify(req.query)

  return result
}