const moment = require('moment')
const schedule = require('node-schedule')

module.exports = {
  formatNewPoll: (poll, user) => {
    if (typeof poll.name !== 'string' ||
        typeof poll.finishedAt !== 'string' ||
        !poll.createdAt ||
        !Array.isArray(poll.options) ) return null

    let formattedPoll = Object.assign({}, poll)

    formattedPoll.finished = false
    formattedPoll.creator = user.userId
    formattedPoll.creatorName = user.screen_name
    formattedPoll.creatorAvatar = `https://avatars.io/twitter/${user.screen_name}`
    formattedPoll.options.forEach(option => {
      option.votes = 0
    })
    formattedPoll.userVotes = {}

    return formattedPoll
  },

  schedulePollClose: (poll, func) => {
    let scheduledCloseTime = moment.utc(poll.finishedAt).local().toDate()
    schedule.scheduleJob(scheduledCloseTime, () => {
      console.log(`Poll with _id of ${poll._id} has been closed at ${poll.finishedAt}`)
      func(poll._id)
    })
    return
  },

  scheduleAllPollCloses: (polls, func) => {
    polls.forEach(poll => {
      let inPast = moment.utc(poll.finishedAt).local().diff(moment.utc()) <= 0
      let scheduledCloseTime = inPast ? moment().toDate() : moment.utc(poll.finishedAt).local().toDate()
      schedule.scheduleJob(scheduledCloseTime, () => {
        console.log(`Poll with _id of ${poll._id} has been closed at ${poll.finishedAt}`)
        func(poll._id)
      })
    })
    return
  }
}
