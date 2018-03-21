const path = require('path')
const express = require('express')

const app = express()
const port = 50031

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`FCC - Voting App started on port ${port}`)
})
