const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cors = require('cors')
const passport = require('passport')
const next = require('next')
const { initDB } = require('./lib/db')
require('dotenv').config()

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    const port = 50032

    server.use(cors())
    server.use(cookieParser())
    server.use(session({ secret: 'moon', resave: false, saveUninitialized: false }))
    server.use(passport.initialize())
    server.use(passport.session())

    initDB().catch(console.error)

    server.use('/api', require('./lib/api'))
    server.use('/auth', require('./lib/auth'))

    server.get('/', (req, res) => {
      const offset = req.query.offset || 0
      const location = req.query.location || ''
      const actualPage = '/'
      const queryParams = { offset, location, user: req.user }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/user', (req, res) => {
      const actualPage = '/user'
      const queryParams = { user: req.user }
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
