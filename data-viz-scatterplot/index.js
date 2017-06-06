var margin = { top: 40, right: 90, bottom: 40, left: 40 };
var width = 1000 - margin.right - margin.left;
var height = 600 - margin.top - margin.bottom;
var tooltipWidth = 180;
var tooltipHeight = 120;
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
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var formatTime = d3.timeFormat('%M:%S')
var formatMinutes = function(d) {
  return formatTime(new Date(2000, 0, 1, 0, 0, d));
}

var getDoping = function(d) {
  if (d.Doping !== '') {
    return 'doping'
  }
  else {
    return ''
  }
}

var formatTooltip = function(d) {
  var string = d.Name + ' - ' + d.Nationality + '<br />'
  string += 'Place: ' + d.Place + '<br />'
  string += 'Time: ' + d.Time + '<br />'

  if (d.Doping) {
    string += '<br/>Doping Allegation:<br/>'
    string += d.Doping
  }

  return string
}

function onDataRecieved() {
  var data = JSON.parse(this.responseText);

  var minTime = d3.min(data, function (d) { return d.Seconds })
  var maxTime = d3.max(data, function (d) { return d.Seconds })

  var minRank = d3.min(data, function (d) { return d.Place })
  var maxRank = d3.max(data, function (d) { return d.Place }) + 2

  var x = d3
    .scaleLinear()
    .domain([minTime, maxTime])
    .range([width, 0])
  var y = d3
    .scaleLinear()
    .domain([maxRank, minRank])
    .range([height, 0])

  // Add the points
  svg.selectAll('dot')
    .data(data)
    .enter().append('circle')
      .attr('class', getDoping)
      .attr('r', 5)
      .attr('cx', function (d) { return x(d.Seconds) })
      .attr('cy', function (d) { return y(d.Place ) })
      .on('mouseover', function(d) {
    		tooltip.transition().duration(100).style('opacity', 0.9);
    		tooltip
    			.html(formatTooltip(d))
    			.style('left', d3.event.pageX + 'px')
    			.style('top', d3.event.pageY - tooltipHeight + 'px');
    	})
    	.on('mouseout', function(d) {
    		tooltip.transition().duration(100).style('opacity', 0);
    	})

  svg.selectAll('dot')
    .data(data)
    .enter().append('text')
      .attr('class', 'plot-label')
      .attr('x', function (d) { return x(d.Seconds) + 6 })
      .attr('y', function (d) { return y(d.Place) + 5 })
      .text(function (d) { return d.Name })

  // The x-axis ticks
  svg.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x)
      .tickFormat(formatMinutes)
    )

  // The x-axis Label
  svg.append('text')
    .attr('class', 'axis-label')
    .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.top) + ')')
    .text('Time')

  // The y-axis ticks
  svg.append('g')
    .call(d3.axisLeft(y))

  // The y-axis label
  svg.append('text')
    .attr('class', 'axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '0.5em')
    .text('Place')

  // Add a key
  svg.append('rect')
    .style('stroke', 'black')
    .style('fill', 'white')
    .attr('width', 250)
    .attr('height', 60)
    .attr('x', width - margin.right - 100)
    .attr('y', height - margin.bottom - 100)
  svg.append('circle')
    .attr('r', 5)
    .attr('cx', width - margin.right - 90 )
    .attr('cy', height - margin.bottom - 80 )
  svg.append('circle')
    .attr('class', 'doping')
    .attr('r', 5)
    .attr('cx', width - margin.right - 90 )
    .attr('cy', height - margin.bottom - 60 )
  svg.append('text')
    .attr('x', width - margin.right - 80)
    .attr('y', height - margin.bottom - 75)
    .text('No allegations of doping')
  svg.append('text')
    .attr('x', width - margin.right - 80)
    .attr('y', height - margin.bottom - 55)
    .text('Proven or allegations of doping')
}

var request = new XMLHttpRequest();
request.addEventListener('load', onDataRecieved);
request.open(
	'GET',
	'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json'
);
request.send();
