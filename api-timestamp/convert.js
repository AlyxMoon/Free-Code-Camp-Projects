module.exports = function(timestamp) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const result = { unix: null, natural: null}

  timestamp = isNaN(parseInt(timestamp)) ? timestamp : parseInt(timestamp) * 1000
  const date = new Date(timestamp)

  if (!isNaN(date)) {
    result.natural = `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
    result.unix = Math.floor(date / 1000)
  }

  return result
}
