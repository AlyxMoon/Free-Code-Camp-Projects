var httpRequest

window.onload = function() {
  var forms = document.getElementsByClassName('api-form')
  for(var i = 0; i < forms.length; i++) {
    if (forms[i].attachEvent) {
      forms[i].attachEvent('submit', handleForm)
    } else {
      forms[i].addEventListener('submit', handleForm)
    }
  }

  var navButtons = document.getElementsByClassName('nav-button')
  for(var i = 0; i < navButtons.length; i++) {
    if (navButtons[i].attachEvent) {
      navButtons[i].attachEvent('click', handleNavs)
    } else {
      navButtons[i].addEventListener('click', handleNavs)
    }
  }
}

function fillAjaxData() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      var prettyText = JSON.stringify(JSON.parse(httpRequest.responseText), null, 2)
      document.getElementById('api-results').innerHTML = '<pre><code>' + prettyText + '</code></pre>'
    }
  }
}

function handleForm(event) {
  event.preventDefault()

  var serverURL = 'http://freecodecamp.allistermoon.com/api-image-search/'

  httpRequest = new XMLHttpRequest()
  httpRequest.onreadystatechange = fillAjaxData

  if (event.target.dataset.endpoint === 'search') {
    var inputs = event.target.elements
    var apiURL = serverURL + 'search/'
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

    httpRequest.open('GET', apiURL + query + '?' + formattedParams)
  }
  if (event.target.dataset.endpoint === 'history') {
    httpRequest.open('GET', serverURL + 'history/')
  }

  httpRequest.send()

  return false
}

function handleNavs(event) {
  event.preventDefault()

  var navs = document.getElementsByClassName('nav-item')
  for (var i = 0; i < navs.length; i++) {
    navs[i].classList.remove('active')
  }
  event.target.parentElement.classList.add('active')

  var tabs = document.getElementsByClassName('tab')
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active')
  }
  document.getElementById(event.target.getAttribute('href').substr(1)).classList.add('active')

  return false
}
