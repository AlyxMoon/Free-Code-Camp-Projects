const tzLookup = require('tz-lookup')
const moment = require('moment-timezone')

// Code used by permission from @author DontQuestionMyName
// Gist: https://gist.github.com/clavin/75c60c4810ece167f4f040b8d787b3a1

module.exports = {
  timeOfDateAtLocation: (dateStr, location) => {
    let locationTz = tzLookup(location.latitude, location.longitude)
    return moment.tz(dateStr, locationTz).valueOf()
  },

  isPast: (dateTime) => {
    return Date.now() - dateTime >= 86400000
  }
}
