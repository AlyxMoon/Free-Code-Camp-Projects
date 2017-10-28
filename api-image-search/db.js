const MongoClient = require('mongodb').MongoClient

const dbUrl = 'mongodb://localhost:27017/imageSearch'
const collectionName = 'previousSearches'
const collectionOpts = { capped: true, size: 1000000, max: 100 }

module.exports = {
  // Clear out any old settings and start fresh
  init: () => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(dbUrl).then(db => {
        db.createCollection(collectionName, collectionOpts).then(resolve, reject)
      }, reject)
    })
  },

  add: (query, props, fullUrl) => {
    let date = new Date
    let timestamp = {
      unix: date.getTime(),
      natural: `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} UTC`
    }

    return new Promise((resolve, reject) => {
      MongoClient.connect(dbUrl).then(db => {
        let collection = db.collection(collectionName)
        collection.insert({
          query: query,
          props: props,
          fullUrl: fullUrl,
          timestamp: timestamp
        })
      }, reject)
    })
  },

  get: () => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(dbUrl).then(db => {
        let collection = db.collection(collectionName)
        collection.find().toArray().then(queries => {
          resolve(queries)
        }, reject)
      }, reject)
    })
  }
}