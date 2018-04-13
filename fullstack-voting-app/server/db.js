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
  getPolls: (userId, currentPollCount, onlyOpenPolls) => {
    let db
    let client
    return MongoClient.connect(dbUrl).then(connection => {
      client = connection
      db = connection.db(dbName)
      return db.collection('polls')
    }).then((collection) => {
      if (!currentPollCount) currentPollCount = 0
      currentPollCount = parseInt(currentPollCount)

      options = {}
      if (userId) options.creator = userId
      if (onlyOpenPolls === 'true') options.finished = false
      return collection.find(options).limit(10).skip(currentPollCount).sort({ $natural: -1 })
    }).then((docs) => {
      return docs.toArray()
    }).then(polls => {
      client.close()
      return polls
    }).catch()
  },
  getAllOpenPolls: () => {
    let db
    let client
    return MongoClient.connect(dbUrl).then(connection => {
      client = connection
      db = connection.db(dbName)
      return db.collection('polls')
    }).then((collection) => {
      return collection.find({ finished: false })
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
  closePoll: (poll_id) => {
    let db
    let client
    return MongoClient.connect(dbUrl).then(connection => {
      client = connection
      db = connection.db(dbName)
      return db.collection('polls')
    }).then((collection) => {
      return collection.updateOne(
        { _id: ObjectId(poll_id) },
        {
          $set: { finished: true }
        }
      )
    }).then(poll => {
      client.close()
      return poll
    }).catch()
  },
  deletePoll: (poll_id, userId) => {
    let db
    let client
    return MongoClient.connect(dbUrl).then(connection => {
      client = connection
      db = connection.db(dbName)
      return db.collection('polls')
    }).then((collection) => {
      return collection.deleteOne({
        _id: ObjectId(poll_id),
        creator: userId
      })
    }).then(commandResult => {
      if (commandResult.deletedCount === 0) {
        return Promise.reject(Error('Poll ID and user ID did not match'))
      }
      client.close()
      return commandResult
    }).catch(error => {
      client.close()
      return Promise.reject(error)
    })
  },
  addVote: (poll_id, option, userId) => {
    let db
    let client
    return MongoClient.connect(dbUrl).then(connection => {
      client = connection
      db = connection.db(dbName)
      return db.collection('polls')
    }).then(collection => {
      return collection.findOne({
        _id: ObjectId(poll_id)
      })
    }).then(poll => {
      if (poll.userVotes[userId]) {
        return Promise.reject('The user or ip address has already voted on this poll!')
      } else if (poll.finished) {
        return Promise.reject('The poll is closed and there is no more voting.')
      } else {
        return db.collection('polls')
      }
    }).then((collection) => {
      return collection.updateOne(
        { _id: ObjectId(poll_id) },
        {
          $inc: { [`options.${option}.votes`]: 1 },
          $set: { [`userVotes.${userId}.vote`]: option }
        }
      )
    }).then(poll => {
      client.close()
      return poll
    }).catch()
  },
  addOption: (poll_id, optionName, userId) => {
    let db
    let client
    return MongoClient.connect(dbUrl).then(connection => {
      client = connection
      db = connection.db(dbName)
      return db.collection('polls')
    }).then(collection => {
      return collection.findOne({
        _id: ObjectId(poll_id)
      })
    }).then(poll => {
      if (poll.userVotes[userId]) {
        return Promise.reject('The user or ip address has already voted on this poll!')
      } else if (poll.finished) {
        return Promise.reject('The poll is closed and there is no more voting.')
      } else {
        return db.collection('polls')
      }
    }).then((collection) => {
      return collection.update(
        { _id: ObjectId(poll_id) },
        {
          $push: { options: {  name: optionName, votes: 1 } },
          $set: { [`userVotes.${userId}.vote`]: optionName }
        }
      )
    }).then(poll => {
      client.close()
      return poll
    }).catch()
  },
  findUserById: (userId) => {
    let db
    let client
    return MongoClient.connect(dbUrl).then(connection => {
      client = connection
      db = connection.db(dbName)
      return db.collection('users')
    }).then(collection => {
      return collection.findOne({
        userId: userId
      })
    }).then(user => {
      client.close()
      return user
    })
  },
  findOrCreateUser: (user) => {
    let db
    let client
    return MongoClient.connect(dbUrl).then(connection => {
      client = connection
      db = connection.db(dbName)
      return db.collection('users')
    }).then(collection => {
      return collection.replaceOne({
        userId: user.id
      }, {
        userId: user.id,
        name: user.displayName,
        screen_name: user.username,
        avatar_url: user._json.profile_image_url
      }, {
        upsert: true
      })
    }).then(user => {
      client.close()
      return user.ops[0]
    })
  }
}

