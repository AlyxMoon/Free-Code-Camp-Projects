var margin = { top: 40, right: 30, bottom: 40, left: 30 };
var width = 1000 - margin.right - margin.left;
var height = 600 - margin.top - margin.bottom;
var tooltipWidth = 100;
var tooltipHeight = 30;
var pad = 2;

var tooltip = d3
	.select('.tooltip')
	.style('width', tooltipWidth + 'px')
	.style('height', tooltipHeight + 'px');

var svg = d3
	.select('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.style('padding', '10px')
	.style('margin', 'auto')
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');

function getDate(d) {
  return new Date(d);
}

function onDataRecieved() {
	var responseJSON = JSON.parse(this.responseText);
	var data = responseJSON.data;

  var minDate = getDate(data[0][0]);
  var maxDate = getDate(data[data.length - 1][0])

  var x = d3.scaleTime().domain([minDate, maxDate]).range([0, width])
	var y = d3
  	.scaleLinear()
  	.domain([
  		0,
  		d3.max(data, function(d) {
  			return d[1];
  		})
  	])
  	.range([0, height]);
  var yFlipped = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function(d) {
        return d[1];
      })
    ])
    .range([height, 0]);

	var bars = svg
    .selectAll('rect')
  	.data(data)
  	.enter()
  	.append('rect')
  	.attr('height', function(d) {
  		return y(d[1]);
  	})
  	.attr('width', width / data.length)
  	.attr('x', function(d, i) {
  		return i * width / data.length;
  	})
  	.attr('y', function(d) {
  		return height - y(d[1]);
  	})
  	.on('mouseover', function(d) {
  		tooltip.transition().duration(100).style('opacity', 0.9);
  		tooltip
  			.html(d[1] + ' Billion' + '<br />' + d[0])
  			.style('left', d3.event.pageX + 'px')
  			.style('top', d3.event.pageY - tooltipHeight + 'px');
  	})
  	.on('mouseout', function(d) {
  		tooltip.transition().duration(100).style('opacity', 0);
  	});

  // The x-axis ticks
  svg.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x))
  // Label for the x-axis
  svg.append('text')
    .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.top) + ')')
    .style('text-anchor', 'middle')
    .text('Date')

  // The y-axis ticks
  svg.append('g')
    .call(d3.axisLeft(yFlipped))
  // Label for the y-axis
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -margin.left + 40)
    .attr('x', -margin.top - 40)
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('GDP (in billions)')

  // Description
  document.getElementById('description').innerHTML = responseJSON.description
}

var request = new XMLHttpRequest();
request.addEventListener('load', onDataRecieved);
request.open(
	'GET',
	'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json'
);
request.send();
