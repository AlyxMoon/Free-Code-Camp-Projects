const {
  MongoClient,
  ObjectId
} = require('mongodb')

const dbUrl = 'mongodb://localhost:27017'
const dbName = 'nightlifeApp'

const state = {
  connection: null,
  db: null
}

const getNestedField = (obj, fields) => {
  return fields.reduce((nestedObject, key) => {
    return (nestedObject && (key in nestedObject)) ? nestedObject[key] : null
  }, obj)
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

const findUserByID = (twitterID, secret) => {
  return connectToDB()
    .then(() => {
      return state.db.collection('users')
    })
    .then(collection => {
      if (!secret) {
        return collection.findOne({
          twitterID: twitterID
        })
      } else {
        return collection.findOne({
          _id: ObjectId(secret),
          twitterID: twitterID
        })
      }
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

const setUserGoingStatus = (dateGoing, barID, userID, goingStatus) => {
  let newCount
  connectToDB()
    .then(() => {
      return state.db.collection('bars')
    })
    // First step: get bar and see if user already has a going status set
    .then(collection => {
      return collection.findOne({
        id: barID
      })
    })
    .then(bar => {
      let currentGoingStatus = getNestedField(
        bar,
        ['schedule', dateGoing, 'users', userID, 'going']
      )
      let currentCount = getNestedField(
        bar,
        ['schedule', dateGoing, 'count']
      ) || 0
      newCount = currentCount
      if (currentGoingStatus === true) {
        if (!goingStatus) newCount = currentCount - 1
      } else if (currentGoingStatus === false) {
        if (goingStatus) newCount = currentCount + 1
      } else {
        goingStatus ? newCount = currentCount + 1 : newCount = currentCount
      }

      return state.db.collection('bars')
    })
    // Second step: update bar count and user going status
    .then(collection => {
      return collection.updateOne({
        id: barID
      }, {
        $set: {
          [`schedule.${dateGoing}.users.${userID}.going`]: goingStatus,
          [`schedule.${dateGoing}.count`]: newCount
        }
      })
    })
    .then(() => {
      return state.db.collection('users')
    })
    .then(collection => {
      return collection.updateOne({
        twitterID: userID
      }, {
        $set: {
          [`schedule.${dateGoing}.${barID}.going`]: goingStatus
        }
      })
    })
    .catch(err => {
      console.log(err)
      return err
    })
}

module.exports.connectToDB = connectToDB
module.exports.closeDB = closeDB
module.exports.initDB = initDB
module.exports.findUserByID = findUserByID
module.exports.findOrCreateUser = findOrCreateUser
module.exports.findOrCreateBar = findOrCreateBar
module.exports.setUserGoingStatus = setUserGoingStatus
