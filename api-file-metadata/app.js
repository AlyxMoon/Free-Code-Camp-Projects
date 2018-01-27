const path = require('path')
const express = require('express')
const app = express()
const port = 50024

const pug = require('pug')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.send(pug.renderFile(path.join(__dirname, '/index.pug')))
})

app.listen(port, () => {
  console.log(`FCC - File Metadata Microservice: Listening on port ${port}`)
})
