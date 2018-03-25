const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
})

// TODO : flesh this out
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

// TODO : flesh this out
app.get('/api/polls', (req, res) => {
  console.log('you hit api polls')
  res.send('success')
})

// TODO : flesh this out
app.get('/api/poll/:poll_id', (req, res) => {
  console.log('you hit the api poll id')
  res.send('success!')
})

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`FCC - Voting App started on port ${port}`)
})
