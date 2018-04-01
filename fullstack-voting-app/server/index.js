const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
require('dotenv').config()

const { auth } = require('./lib/auth')
const {formatNewPoll} = require('./lib/poll')

const db = require(path.join(__dirname, 'db'))
db.init().then(() => {
  console.log('database stuff successful')
}).catch(err => {
  console.log('database stuff failed', err)
})

const app = express()
const port = 50031

app.use(cors())
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'moon', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
})

app.post('/api/poll/add', (req, res) => {
  let formattedPoll = formatNewPoll(req.body.poll)
  if (formattedPoll) {
    db.addPoll(formattedPoll).then(poll => {
      res.json(poll)
    }).catch(error => {
      console.log('error adding something to database', error)
      res.send('failure :(')
    })

  } else {
    console.log('provided poll was bad')
    res.send('failure :(')
  }
})

app.get('/api/polls', (req, res) => {
  db.getPolls().then(polls => {
    res.json(polls)
  }).catch(error => {
    res.json({ error: error })
  })
})

app.get('/api/poll/:poll_id', (req, res) => {
  db.getPoll(req.params.poll_id).then(poll => {
    res.json(poll)
  }).catch(error => {
    res.json({ error: error })
  })
})

app.get('/api/vote/:poll_id/:vote', (req, res) => {
  db.addVote(req.params.poll_id, req.params.vote).then(() => {
    res.json({ message: 'vote registered successfully' })
  }).catch(error => {
    res.json({ error: error })
  })
})

app.get('/api/options/:poll_id/:option', (req, res) => {
  console.log(req.params.poll_id, req.params.option)
  db.addOption(req.params.poll_id, req.params.option).then(() => {
    res.json({ message: 'options added successfully' })
  }).catch(error => {
    res.json({ error: error })
  })
})

app.get('/auth/twitter', auth.authenticate('twitter'))
app.get('/auth/twitter/callback',
  auth.authenticate('twitter', {  successRedirect: '/',
                                    failureRedirect: '/login' }))

app.use((req, res) => {
  console.log(req.user)
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`FCC - Voting App started on port ${port}`)
})
