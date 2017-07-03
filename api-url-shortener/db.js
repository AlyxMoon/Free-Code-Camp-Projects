const MongoClient = require('mongodb').MongoClient
const random = require('randomstring')

const dbUrl = 'mongodb://localhost:27017/urlShortener'
const collectionName = 'urls'
const collectionOpts = { capped: true, size: 1000000, max: 100 }
const serverWebPath = 'http://freecodecamp.allistermoon.com/api-url-shortener/'

module.exports = {
  // Clear out any old settings and start fresh
  init: () => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(dbUrl).then(db => {
        db.collection(collectionName).drop()
        db.createCollection(collectionName, collectionOpts).then(resolve, reject)
      }, reject)
    })
  },

  add: url => {
    return new Promise((resolve, reject) => {
      let result = { original_url: url, short_url: ''}
      MongoClient.connect(dbUrl).then(db => {
        let collection = db.collection(collectionName)
        collection.find({ original_url: url }).limit(1).toArray().then(doc => {
          if (doc.length === 0) {
            let hash = random.generate(8)
            let short_url = `${serverWebPath}go/${hash}`
            collection.insert({
              original_url: url,
              short_url: short_url,
              hash: hash
            })
            result.short_url = short_url
          } else {
            result.short_url = doc[0].short_url
          }

          resolve(result)
        }, reject)
      }, reject)
    })
  },

  get: string => {
    return new Promise((resolve, reject) => {
      let result = { original_url: '', short_url: `${serverWebPath}go/${string}`}
      MongoClient.connect(dbUrl).then(db => {
        let collection = db.collection(collectionName)
        collection.find({ hash: string }).limit(1).toArray().then(doc => {
          if (doc.length !== 0) {
            result.original_url = doc[0].original_url
          }

          resolve(result)
        }, reject)
      }, reject)
    })
  },

  showAll: () => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(dbUrl).then(db => {
        let collection = db.collection(collectionName)
        collection.find().toArray().then(docs => {
          resolve(docs)
        }, reject)
      }, reject)
    })
  }
}