var httpRequest

window.onload = function() {
  var form = document.getElementById('api-form')
  if (form.attachEvent) {
    form.attachEvent('submit', handleForm)
  } else {
    form.addEventListener('submit', handleForm)
  }
}

function handleForm(event) {
  event.preventDefault()

  var inputs = event.target.elements
  var apiURL = 'http://freecodecamp.allistermoon.com/api-image-search/search/'
  var query = inputs.query.value
  var params = {
    offset: inputs.offset.value,
    count: inputs.count.value,
    exactTerms: inputs.exactTerms.value,
    excludeTerms: inputs.excludeTerms.value
  }
  var formattedParams = Object.keys(params)
    .map(k => k + '=' + encodeURIComponent(params[k]))
    .join('&')

  httpRequest = new XMLHttpRequest()
  httpRequest.onreadystatechange = fillAjaxData
  httpRequest.open('GET', apiURL + query + '?' + formattedParams)
  httpRequest.send()

  return false
}

function fillAjaxData() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      console.log(httpRequest.responseText)
      var prettyText = JSON.stringify(JSON.parse(httpRequest.responseText), null, 2)
      document.getElementById('api-results').innerHTML = '<pre><code>' + prettyText + '</code></pre>'
    }
  }
}