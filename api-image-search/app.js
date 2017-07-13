const path = require('path')
const express = require('express')
const app = express()
const port = 50023

const pug = require('pug')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.send(pug.renderFile(path.join(__dirname, '/index.pug')))
})
