function submit (datetime) {
  if (value === undefined) {
    datetime = document.getElementById('datetime').value
  }
  window.location.href = 'http://freecodecamp.allistermoon.com/api-timestamp/' + datetime
}

function submitRandom () {
  var range = 100000000000

  var datetime = Math.floor(Math.random() * 2 * range) - range
  window.location.href = 'http://freecodecamp.allistermoon.com/api-timestamp/' + datetime
}