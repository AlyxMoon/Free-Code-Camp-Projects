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
        state.db.createCollection('friends'),
        state.db.createCollection('bars')
      ])
    })
}

module.exports.connectToDB = connectToDB
module.exports.closeDB = closeDB
module.exports.initDB = initDB
