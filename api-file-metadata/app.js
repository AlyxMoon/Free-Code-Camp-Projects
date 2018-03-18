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
  let formattedFiles = []
  req.files.forEach(file => {
    formattedFiles.push({
      name: file.originalname,
      size: file.size,
      sizeInSI: getFormattedSize(file.size, 0),
      sizeInIEC: getFormattedSize(file.size, 1)
     })
  })

  res.json(formattedFiles)

  req.files.forEach(file => {
    fs.unlink(file.path, err => {
      if (err) console.log(`Error when trying to delete file: ${err}`)
    })
  })

})

app.listen(port, () => {
  console.log(`FCC - File Metadata Microservice: Listening on port ${port}`)
})

// 0 for SI prefix, 1 (or anything else) for IEC prefix
function getFormattedSize(size, option = 0) {
  let format = 0
  let units = []
  if (option === 0) {
    format = 1000
    units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  } else {
    format = 1024
    units = ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  }
  let i = Math.floor( Math.log(size) / Math.log(format) )
  return `${( size / Math.pow(format, i) ).toFixed(2)} ${units[i]}`
}