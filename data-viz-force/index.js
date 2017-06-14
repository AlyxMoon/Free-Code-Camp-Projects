var margin = { top: 40, right: 30, bottom: 40, left: 60 }
var width = 850 - margin.right - margin.left
var height = 700 - margin.top - margin.bottom
var tooltipWidth = 100
var tooltipHeight = 30
var flagWidth = 18
var flagHeight = 12
var pad = 5

var tooltip = d3
	.select('.tooltip')
	.style('width', tooltipWidth + 'px')
	.style('height', tooltipHeight + 'px')

var svg = d3
	.select('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.style('margin', 'auto')
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.right + ')')

function onDataRecieved() {
  var data = JSON.parse(this.responseText)
  var nodes = data.nodes
  var links = data.links

  var node = d3.select('.flags-container').selectAll('node')
    .data(nodes)
    .enter().append('image')
      .attr('class', function (d) { return 'node flag flag-' + d.code })
      .attr('src', 'flags/blank.png')
      .on('mouseover', function(d) {
    		tooltip.transition().duration(100).style('opacity', 0.9);
    		tooltip
    			.html(d.country)
    			.style('left', (d3.event.pageX + 5) + 'px')
    			.style('top', (d3.event.pageY - tooltipHeight - 5) + 'px')
    	})
    	.on('mouseout', function(d) {
    		tooltip.transition().duration(100).style('opacity', 0)
      })

  var link = svg.selectAll('link')
    .data(links)
    .enter().append('line')
      .attr('class', 'link')

  var simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force("charge", d3.forceManyBody().strength(-30).distanceMax(300))
    .force("vertical", d3.forceY().strength(0.020))
    .force("horizontal", d3.forceX().strength(0.010))
    .on('tick', function () {
      node
        .style('left', function (d) { return (d.x + margin.left - flagWidth / 2) + 'px' })
        .style('top', function (d) { return (d.y + margin.top - flagHeight) + 'px' })

      link
        .attr('x1', function (d) { return d.source.x })
        .attr('y1', function (d) { return d.source.y })
        .attr('x2', function (d) { return d.target.x })
        .attr('y2', function (d) { return d.target.y })
    })
}

var request = new XMLHttpRequest()
request.addEventListener('load', onDataRecieved)
request.open(
	'GET',
	'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json'
)
request.send()
