const MongoClient = require('mongodb').MongoClient
const random = require('randomstring')

const dbUrl = 'mongodb://localhost:27017/urlShortener'
const collectionName = 'urls'
const serverWebPath = 'http://freecodecamp.allistermoon.com/api-url-shortener/'

module.exports = {
  add: (url, callback) => {
    if (typeof callback !== 'function') callback = () => {}
    let result = { original_url: url, short_url: ''}

    MongoClient.connect(dbUrl, (err, db) => {
      db.createCollection(collectionName, (err, collection) => {
        collection.find({
          original_url: url
        }).limit(1).toArray((err, doc) => {
          if (doc.length === 0) {
            let short_url = `${serverWebPath}go/${random.generate(8)}`
            collection.insert({
              original_url: url,
              short_url: short_url
            })
            result.short_url = short_url
          } else {
            result.short_url = doc[0].short_url
          }

          db.close()
          callback(null, result)
        })
      })
    })
  },

  get: (string, callback) => {
    if (typeof callback !== 'function') callback = () => {}
    let result = { original_url: '', short_url: `${serverWebPath}go/${string}`}

    MongoClient.connect(dbUrl, (err, db) => {
      db.createCollection(collectionName, (err, collection) => {
        collection.find({
          short_url: `${serverWebPath}go/${string}`
        }).limit(1).toArray((err, doc) => {
          if (doc.length !== 0) {
            result.original_url = doc[0].original_url
          }

          db.close()
          callback(null, result)
        })
      })
    })
  }
}