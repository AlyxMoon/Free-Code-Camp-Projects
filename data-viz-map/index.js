var width = 1200
var height = 800
var pad = 5

var template = function (geography, data) {
  var string = '<div class="hoverinfo"><strong>'
  string += 'Name: ' + data.name + '<br>'
  string += 'Mass: ' + data.mass + '<br>'
  string += 'Year: ' + data.year
  string += '</strong></div>'

  return  string
}

var map = new Datamap({
  element: document.getElementById('container'),
  projection: 'mercator',
  scope: 'world',
  width: width,
  height: height,
  fills: {
    BUBBLE: '#000',
    defaultFill: '#3FB0AC'
  },
  bubblesConfig: {
    borderColor: '#000',
    fillKey: 'BUBBLE',
    highlightFillColor: '#1C2C35',
    popupTemplate: template
  }
})

function onDataRecieved() {
  var data = JSON.parse(this.responseText)

  var minMass = d3.min(data.features, function (d) { return parseInt(d.properties.mass) })
  var maxMass = d3.max(data.features, function (d) { return parseInt(d.properties.mass) })

  var radiusScale = d3.scale.sqrt()
    .domain([minMass, maxMass])
    .range([1, 20])

  // Filter out meteorites without location data and then format for the map
  var meteorites = data.features.filter(function (d) {
    return d.geometry
  }).map(function (d) {
    if (d.properties.mass === null) d.properties.mass = '0'
    return {
      name: d.properties.name,
      mass: d.properties.mass,
      year: (new Date(d.properties.year)).getFullYear(),
      radius: radiusScale(parseInt(d.properties.mass)),
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
