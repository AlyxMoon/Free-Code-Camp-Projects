const MongoClient = require('mongodb').MongoClient

const dbUrl = 'mongodb://localhost:27017'
const dbName = 'votingApp'
const optsUsers = { capped: true, size: 1000000, max: 3000 }
const optsPolls = { capped: true, size: 1000000, max: 255 }

module.exports = {
  init: () => {
    let db
    let client
    return MongoClient.connect(dbUrl).then(connection => {
      client = connection
      db = connection.db(dbName)
      return db.createCollection('users', optsUsers)
    }).then(() => {
      return db.createCollection('polls', optsPolls)
    }).then(() => {
      client.close()
    }).catch()
  },
  addPoll: (poll) => {
    let db
    let client
    return MongoClient.connect(dbUrl).then(connection => {
      client = connection
      db = connection.db(dbName)
      return db.collection('polls')
    }).then((collection) => {
      return collection.insert(poll)
    }).then((doc) => {
      client.close()
      return doc.ops[0]
    }).catch()
  }
}
