const {
  MongoClient
} = require('mongodb')

const dbUrl = 'mongodb://localhost:27017'
const dbName = 'nightlifeApp'

const state = {
  connection: null,
  db: null
}

const connectToDB = () => {
  return MongoClient.connect(dbUrl).then(connection => {
    state.connection = connection
    state.db = connection.db(dbName)
  })
}

const closeDB = () => {
  return new Promise((resolve, reject) => {
    state.connection.close()
    state.db = null
    resolve()
  })
}

const initDB = () => {
  return connectToDB()
    .then(() => {
      return Promise.all([
        state.db.createCollection('users'),
        state.db.createCollection('bars')
      ])
    })
}

const findUserByID = (twitterID) => {
  return connectToDB()
    .then(() => {
      return state.db.collection('users')
    })
    .then(collection => {
      return collection.findOne({
        twitterID: twitterID
      })
    })
}

const findOrCreateUser = (user) => {
  return findUserByID(user.id)
    .then(existingUser => {
      if (existingUser) return existingUser
      return new Promise((resolve, reject) => {
        resolve(state.db.collection('users'))
      }).then(collection => {
        return collection.insertOne({
          twitterID: user.id,
          twitterName: user.displayName,
          twitterUsername: user.username,
          twitterAvatar: `https://avatars.io/twitter/${user.username}`,
          friends: [],
          schedule: {}
        })
      }).then(result => {
        return result.ops[0]
      })
    })
}

const findOrCreateBar = (id) => {
  let col
  return connectToDB()
    .then(() => {
      return state.db.collection('bars')
    })
    .then(collection => {
      col = collection
      return collection.findOne({
        id: id
      })
    })
    .then(existingBar => {
      console.log('found a bar?', existingBar)
      if (existingBar) return existingBar

      return new Promise((resolve, reject) => {
        resolve(col.insertOne({
          id,
          schedule: {}
        }))
      }).then(result => {
        return result.ops[0]
      })
    })
}

module.exports.connectToDB = connectToDB
module.exports.closeDB = closeDB
module.exports.initDB = initDB
module.exports.findUserByID = findUserByID
module.exports.findOrCreateUser = findOrCreateUser
module.exports.findOrCreateBar = findOrCreateBar
