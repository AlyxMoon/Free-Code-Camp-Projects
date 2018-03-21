const MongoClient = require('mongodb').MongoClient

const dbUrl = 'mongodb://localhost:27017'
const dbName = 'votingApp'
const optsUsers = { capped: true, size: 1000000, max: 3000 }
const optsPolls = { capped: true, size: 1000000, max: 255 }

module.exports = {
  init: () => {

    return new Promise((resolve, reject) => {
      let db
      let client
      MongoClient.connect(dbUrl).then(connection => {
        client = connection
        db = connection.db(dbName)
        return db.createCollection('users', optsUsers)
      }).then(() => {
        return db.createCollection('polls', optsPolls)
      }).then(() => {
        client.close()
        resolve()
      }).catch(reject)
    })
  }
}