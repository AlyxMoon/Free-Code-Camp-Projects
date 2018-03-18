const path = require('path')
const fs = require('fs')
const express = require('express')
const multer = require('multer')
const upload = multer({ dest: '/tmp' })

const app = express()
const port = 50024

const pug = require('pug')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.send(pug.renderFile(path.join(__dirname, '/index.pug')))
})
app.post('/api', upload.array('files', 10), (req, res, next) => {
  res.json(req.files)
  req.files.forEach(file => {
    fs.unlink(file.path, err => {
      if (err) console.log(`Error when trying to delete file: ${err}`)
    })
  })

})

app.listen(port, () => {
  console.log(`FCC - File Metadata Microservice: Listening on port ${port}`)
})
