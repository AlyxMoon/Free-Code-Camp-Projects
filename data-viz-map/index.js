var width = 1200
var height = 800
var pad = 5

var map = new Datamap({
  element: document.getElementById('container'),
  projection: 'mercator',
  scope: 'world',
  width: width,
  height: height,
  fills: {
    BUBBLE: '#000',
    defaultFill: '#ABDDA4'
  },
  bubblesConfig: {
    borderColor: '#000',
    fillKey: 'BUBBLE'
  }
})

function onDataRecieved() {
  var data = JSON.parse(this.responseText)

  // Filter out meteorites without location data and then format for the map
  var meteorites = data.features.filter(function (d) {
    return d.geometry
  }).map(function (d) {
    return {
      name: d.properties.name,
      radius: 1,
      longitude: d.geometry.coordinates[0],
      latitude: d.geometry.coordinates[1]
    }
  })

  map.bubbles(meteorites)
}

var request = new XMLHttpRequest()
request.addEventListener('load', onDataRecieved)
request.open(
	'GET',
	'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json'
)
request.send()
