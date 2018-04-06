const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const session = require('express-session')
require('dotenv').config()

const { auth, getUserIP } = require('./lib/auth')
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
app.use(cookieParser())
app.use(session({ secret: 'moon', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  console.log(req.connection.remoteAddress)
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
})

app.post('/api/poll/add', (req, res) => {
  if (!req.user) {
    res.json({ error: 'polls can only be added by authenticated users' })
  } else {
    let formattedPoll = formatNewPoll(req.body.poll, req.user)
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
  }

})

app.get('/api/polls', (req, res) => {
  db.getPolls().then(polls => {
    res.json(polls)
  }).catch(error => {
    res.json({ error: error })
  })
})

app.get('/api/mypolls/', (req, res) => {
  if (req.user) {
    db.getPolls(req.user.userId).then(polls => {
      res.json(polls)
    }).catch(error => {
      res.json({ error: error })
    })
  } else {
    res.json({ error: 'You need to be logged in to view your polls' })
  }
})


app.get('/api/poll/:poll_id', (req, res) => {
  db.getPoll(req.params.poll_id).then(poll => {
    res.json(poll)
  }).catch(error => {
    res.json({ error: error })
  })
})

app.get('/api/poll/:poll_id/delete', (req, res) => {
  if (!req.user) {
    res.status(404).send('Only a registered user can delete their own poll.')
  } else {
    db.deletePoll(req.params.poll_id, req.user.userId).then(() => {
      res.json({
        message: 'success deleting poll',
        poll_id: req.params.poll_id
      })
    }).catch(error => {
      res.json({ error: error.message })
    })
  }
})

app.get('/api/vote/:poll_id/:vote', (req, res) => {
  if (req.user) {
    db.addVote(req.params.poll_id, req.params.vote, req.user.userId).then(() => {
      res.json({ message: 'vote registered successfully' })
    }).catch(error => {
      res.json({ error: error })
    })
  } else {
    db.addVote(req.params.poll_id, req.params.vote, getUserIP(req)).then(() => {
      res.json({ message: 'vote registered successfully' })
    }).catch(error => {
      res.json({ error: error })
    })
  }

})

app.get('/api/options/:poll_id/:option', (req, res) => {
  if (!req.user) {
    res.json({ error: 'Only registered users can add a new option to a poll.' })
  } else {
    db.addOption(req.params.poll_id, req.params.option, req.user.userId).then(() => {
      res.json({ message: 'options added successfully' })
    }).catch(error => {
      res.json({ error: error })
    })
  }
})

app.get('/api/user', (req, res) => {
  if (req.user) {
    res.json({
      username: req.user.name,
      userId: req.user.userId,
      userScreenName: req.user.screen_name
    })
  } else {
    res.status(404).send('Current user is not logged in')
  }
})

app.get('/auth/twitter', (req, res) => {
    res.cookie('authRedirect', req.header('Referrer'), { expire : new Date() + 1000 })
    auth.authenticate('twitter')(req, res)
  })
app.get('/auth/twitter/callback',
  auth.authenticate('twitter'),
  (req, res) => {
    if (req.cookies && req.cookies.authRedirect) {
      res.redirect(req.cookies.authRedirect)
    } else {
      res.redirect('/')
    }
  })
app.get('/auth/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`FCC - Voting App started on port ${port}`)
})
