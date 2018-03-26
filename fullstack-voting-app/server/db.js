const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const dbUrl = 'mongodb://localhost:27017'
const dbName = 'votingApp'
const optsUsers = { max: 3000 }
const optsPolls = { max: 1000 }

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
  },
  getPolls: () => {
    let db
    let client
    return MongoClient.connect(dbUrl).then(connection => {
      client = connection
      db = connection.db(dbName)
      return db.collection('polls')
    }).then((collection) => {
      return collection.find()
    }).then((docs) => {
      return docs.toArray()
    }).then(polls => {
      client.close()
      return polls
    }).catch()
  },
  getPoll: (poll_id) => {
    let db
    let client
    return MongoClient.connect(dbUrl).then(connection => {
      client = connection
      db = connection.db(dbName)
      return db.collection('polls')
    }).then((collection) => {
      return collection.findOne(ObjectId(poll_id))
    }).then(poll => {
      client.close()
      return poll
    }).catch()
  },
  addVote: (poll_id, option) => {
    let db
    let client
    return MongoClient.connect(dbUrl).then(connection => {
      client = connection
      db = connection.db(dbName)
      return db.collection('polls')
    }).then((collection) => {
      return collection.update(
        { _id: ObjectId(poll_id) },
        { $inc: { [`options.${option}.votes`]: 1 }}
      )
    }).then(poll => {
      client.close()
      return poll
    }).catch()
  },
  addOption: (poll_id, optionName) => {
    let db
    let client
    return MongoClient.connect(dbUrl).then(connection => {
      client = connection
      db = connection.db(dbName)
      return db.collection('polls')
    }).then((collection) => {
      return collection.update(
        { _id: ObjectId(poll_id) },
        { $push: { options: {  name: optionName, votes: 1 } } }
      )
    }).then(poll => {
      client.close()
      return poll
    }).catch()
  }
}

