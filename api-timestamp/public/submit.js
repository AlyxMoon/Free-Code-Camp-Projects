function submit () {
  var datetime = document.getElementById('datetime').value
  window.location.href = '/' + datetime
}

function submitRandom () {
  var range = 100000000000

  var datetime = Math.floor(Math.random() * 2 * range) - range
  window.location.href = '/' + datetime
}