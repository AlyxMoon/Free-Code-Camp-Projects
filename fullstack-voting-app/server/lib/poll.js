/*
_id         AUTO_CREATED
name        PROVIDED
creator     AUTO_CREATED
createdAt   AUTO_CREATED
finishedAt  PROVIDED
finished    AUTO_CREATED
options     PROVIDED


*/
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
  }
}
