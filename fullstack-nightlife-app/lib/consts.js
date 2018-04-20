module.exports = {
  DEFAULT_API_QUERY_LIMIT: 10,
  DEFAULT_API_OPTIONS: {
    method: 'GET',
    headers: {
      'Content-Type': 'application/JSON',
      'Authorization': `Bearer ${process.env.YELP_KEY}`
    }
  }
}
