const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    const port = 50032

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