const path = require('path')
const pug = require('pug')
const express = require('express')
const app = express()
const port = 50022

const db = require(path.join(__dirname, 'db.js'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send(pug.renderFile(path.join(__dirname, 'index.pug')))
})

app.get('/add/*', (req, res) => {
  console.log(`Attempting to add url: ${req.params[0]}`)

  res.setHeader('content-type', 'application/json')
  db.add(req.params[0], function (err, reply) {
    if (err) {
      console.log('Error while adding url', err)
      res.send({ original_url: '', short_url: '' })
    } else {
      res.send(reply)
    }
  })
})

app.get('/go/*', (req, res) => {
  db.get(req.params[0], function (err, reply) {
    if (err) {
      console.log('Error while getting url', err)
      res.setHeader('content-type', 'application/json')
      res.send({ result: 'Error while retrieving original url'})
    } else {
      if (reply.original_url === '') {
        res.setHeader('content-type', 'application/json')
        res.send(reply)
      } else {
        res.redirect(reply.original_url)
      }
    }
  })
})

app.listen(port, () => {
  console.log(`FCC - URL Shortener Microservice: Listening on port ${port}`)
  db.init().then(() => {
    console.log('Initialized the database successfully')
  }, (reason) => {
    console.log(`Error initializing database: ${reason}`)
    console.log(`Shutting down the app`)
    app.close()
  })
})
