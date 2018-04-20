const express = require('express')
const next = require('next')
require('dotenv').config()

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    const port = 50032

    server.use('/api', require('./lib/api'))

    server.get('/', (req, res) => {
      const offset = req.query.offset || 0
      const actualPage = '/'
      const queryParams = { offset: offset }
      console.log('In the server route', offset)
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, err => {
      if (err) throw err
      console.log(`> FreeCodeCamp Fullstack Nightlife App ready on port ${port}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
