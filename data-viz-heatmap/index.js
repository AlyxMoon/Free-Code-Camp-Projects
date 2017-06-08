var margin = { top: 40, right: 30, bottom: 40, left: 60 }
var width = 1250 - margin.right - margin.left
var height = 700 - margin.top - margin.bottom
var tooltipWidth = 100
var tooltipHeight = 40
var pad = 5

var legendRectWidth = 40
var legendRectHeight = 20

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

var tooltip = d3
	.select('.tooltip')
	.style('width', tooltipWidth + 'px')
	.style('height', tooltipHeight + 'px')

var svg = d3
	.select('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.style('padding', '10px 10px 10px 20px')
	.style('margin', 'auto')
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.right + ')')


var formatTooltip = function (d) {
  var string = 'Year: ' + d.year + '<br />'
  string += 'Month: ' + d.month + '<br />'
  string += 'Variance: ' + d.variance + '<br />'

  return string
}

var formatMonth = function (d) {
  return months[d - 1]
}

function onDataRecieved() {
  var data = JSON.parse(this.responseText)

  var baseTemp = data.baseTemperature
  var minYear = d3.min(data.monthlyVariance, function (d) { return d.year })
  var maxYear = d3.max(data.monthlyVariance, function (d) { return d.year })

  var minVariance = 0
  var maxVariance = d3.max(data.monthlyVariance, function (d) { return Math.abs(d.variance) })

  // x acts as horizontal year indicator
  // y acts as vertical month indicator
  // rectangles are colored to represent variance from base temperature
  var x = d3.scaleLinear()
    .domain([minYear, maxYear])
    .range([0, width])
  var y = d3.scaleLinear()
    .domain([1, 12])
    .range([0, height - margin.top - margin.bottom])

  var color = d3.scaleSequential()
    .domain([maxVariance, minVariance])
    .interpolator(d3.interpolateInferno)

  var rectWidth = x(minYear + 1) - x(minYear)
  var rectHeight = (height - margin.top - margin.bottom) / 11

  svg.selectAll('rect')
    .data(data.monthlyVariance)
    .enter().append('rect')
      .attr('width', rectWidth)
      .attr('height', rectHeight)
      .attr('x', function (d) { return x(d.year) })
      .attr('y', function (d) { return y(d.month) })
      .attr('fill', function (d) { return color(d.variance) })
      .on('mouseover', function(d) {
    		tooltip.transition().duration(100).style('opacity', 0.9);
    		tooltip
    			.html(formatTooltip(d))
    			.style('left', (d3.event.pageX + 5) + 'px')
    			.style('top', (d3.event.pageY - tooltipHeight - 5) + 'px');
    	})
    	.on('mouseout', function(d) {
    		tooltip.transition().duration(100).style('opacity', 0);
    	})

  // The x-axis label
  svg.append('text')
  .attr('class', 'axis-label')
    .attr('transform', 'translate(' + (width / 2) + ',' + (height + (margin.top / 2) ) + ')')
    .text('Year')
  // The x-axis ticks
  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (height - (margin.top / 2) ) + ')')
    .call(d3.axisBottom(x)
      .ticks((maxYear - minYear) / 10)
    )

  // The y-axis label
  svg.append('text')
    .attr('class', 'axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - (height / 2))
    .text('Month')

  // The y-axis ticks
  svg.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(-' + pad + ',' + (rectHeight / 2) + ')')
    .call(d3.axisLeft(y)
      .tickFormat(formatMonth)
    )

  // Heat Map Legend
  var legendVals = [
    0,
    maxVariance * 1 / 6,
    maxVariance * 2 / 6,
    maxVariance * 3 / 6,
    maxVariance * 4 / 6,
    maxVariance * 5 / 6,
    maxVariance
  ]
  var legendValsWidth = legendVals.length * legendRectWidth
  var legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', 'translate(' + (width - legendValsWidth) + ',' + (height + (margin.top / 2) ) + ')')
  legend.selectAll('.legend-rect')
    .data(legendVals)
    .enter().append('rect')
      .attr('class', 'legend-rect')
      .attr('width', legendRectWidth)
      .attr('height', legendRectHeight)
      .attr('x', function (d,i) { return i * legendRectWidth })
      .attr('y', 0)
      .attr('fill', function (d) { return color(d) })
  legend.selectAll('.legend-label')
    .data(legendVals)
    .enter().append('text')
      .attr('class', 'legend-label')
      .attr('x', function (d,i) { return i * legendRectWidth + (legendRectWidth / 2) })
      .attr('y', legendRectHeight)
      .attr('dy', '1em')
      .text(function (d) { return d.toFixed(2) })
}

var request = new XMLHttpRequest()
request.addEventListener('load', onDataRecieved)
request.open(
	'GET',
	'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json'
)
request.send()
