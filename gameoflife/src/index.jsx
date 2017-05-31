import React from 'react'
import ReactDOM from 'react-dom'

$("document").ready(function() {
	randomizeGrid();
	display();
	displayHistory();

	timer();
});

var cells = [];
var cellHistory = [];
var cellsAlive = 0;
var width = 20;
var height = 20;
var generation = 0;
var delay = 500;
var running = true;
var mouseDown = false;
var cellsBordered = false;

var timer = function() {
	window.setTimeout(function() {
		if (running) {
			runGeneration();
			display();
		}
		timer();
	}, delay);
};

function display() {
	ReactDOM.render(
		React.createElement(Grid, { cells: cells }),
		document.getElementById("game-board")
	);
	ReactDOM.render(
		React.createElement(Stats, { generation: generation, cellCount: cellsAlive }),
		document.getElementById("stats")
	);
	ReactDOM.render(
		React.createElement(History, { generations: generation }),
		document.getElementById("history")
	);
}

function displayHistory() {
	var gen = parseInt($("#history-select").val());
	ReactDOM.render(
		React.createElement(Grid, { cells: cellHistory[gen] }),
		document.getElementById("history-board")
	);
}

// Get rid of that darn focus
$("button").click(function() {
	this.blur();
});

$("#game-board").mousedown(function() {
	mouseDown = true;
});
$("#game-board").mouseup(function() {
	mouseDown = false;
});

//----------------------------------------
// Changing grid size
$("#size-1").click(function() {
	width = 10;
	height = 10;
	defaultSizeRules(this);
});

$("#size-2").click(function() {
	width = 20;
	height = 20;
	defaultSizeRules(this);
});

$("#size-3").click(function() {
	width = 50;
	height = 50;
	defaultSizeRules(this);
});

$("#size-4").click(function() {
	width = 100;
	height = 100;
	defaultSizeRules(this);
});

function defaultSizeRules(element) {
	randomizeGrid();
	display();
	displayHistory();
	var styles = {
		width: width * 12,
		height: height * 12
	};
	$(".grid").css(styles);
	$(element).siblings().removeClass("active");
	$(element).addClass("active");

	$(".cell:nth-child(10n + 1)").css("clear", "none");
	$(".cell:nth-child(20n + 1)").css("clear", "none");
	$(".cell:nth-child(50n + 1)").css("clear", "none");
	$(".cell:nth-child(100n + 1)").css("clear", "none");
	$(`.cell:nth-child(${width}n + 1)`).css("clear", "both");
}
//----------------------------------------
// Change speed
$("#speed-1").click(function() {
	delay = 1000;
	defaultSpeedRules(this);
});

$("#speed-2").click(function() {
	delay = 500;
	defaultSpeedRules(this);
});

$("#speed-3").click(function() {
	delay = 300;
	defaultSpeedRules(this);
});

$("#speed-4").click(function() {
	delay = 100;
	defaultSpeedRules(this);
});

function defaultSpeedRules(element) {
	$(element).siblings().removeClass("active");
	$(element).addClass("active");
}
//----------------------------------------
// Run commands
$("#command-run").click(function() {
	running = true;

	$("#command-pause").removeClass("active");
	$(this).addClass("active");
});

$("#command-pause").click(function() {
	running = false;

	$("#command-run").removeClass("active");
	$(this).addClass("active");
});

$("#command-clear").click(function() {
	running = false;
	for (var i = 0; i < cells.length; i++) {
		cells[i] = false;
	}
	generation = 0;
	cellsAlive = 0;
	cellHistory = [];
	cellHistory.push(cells);
	display();

	$("#command-run").removeClass("active");
	$("#command-pause").addClass("active");
});

$("#command-randomize").click(function() {
	randomizeGrid();
	display();
});
//----------------------------------------
// Display Options
$("#border-toggle").click(function() {
	cellsBordered = !cellsBordered;
	$(this).toggleClass("active");
	display();
	displayHistory();
});
//----------------------------------------
// History Options
$("#prev-history").click(function() {
	var gen = parseInt($("#history-select").val());
	gen--;
	if (gen < 0) gen = 0;
	$("#history-select").val(gen);

	displayHistory();
});

$("#next-history").click(function() {
	var gen = parseInt($("#history-select").val());
	gen++;
	if (gen > generation) gen = generation;
	$("#history-select").val(gen);

	displayHistory();
});

$("#show-history").click(displayHistory);
//----------------------------------------
// Cellular Behavior
class Grid extends React.Component {
	getCellClass(alive) {
		var result = "cell";
		if (alive) result += " alive";
		if (cellsBordered) result += " bordered";

		return result;
	}

	render() {
		var cells = this.props.cells;
		return (
			<div className="grid">
				{cells.map((alive, index) => (
					<div
            key={index}
						id={index}
						onClick={cellClicked}
						onMouseEnter={cellHover}
						className={this.getCellClass(alive)}
					/>
				))}
			</div>
		);
	}
}

function cellClicked(event) {
	var cellID = parseInt(event.currentTarget.id);
	cells[cellID] = !cells[cellID];

	if (cells[cellID]) cellsAlive++;
	else cellsAlive--;

	generation = 0;
	cellHistory = [];
	cellHistory.push(cells);
	display();
}

function cellHover(event) {
	if (mouseDown) cellClicked(event);
}

function randomizeGrid() {
	cells = [];
	cellHistory = [];
	cellsAlive = 0;
	generation = 0;

	for (var i = 0; i < width * height; i++) {
		var min = 1;
		var max = 100;
		var randomNum = Math.floor(Math.random() * (max - min)) + min;

		if (randomNum > 80) {
			cells.push(true);
		} else {
			cells.push(false);
		}
	}
	cellHistory.push(cells);
	cellsAlive = getAliveCount();
}

function runGeneration() {
	var newBoard = [];

	cells.forEach(function(cell, index) {
		if (willBeAlive(index)) {
			newBoard.push(true);
		} else {
			newBoard.push(false);
		}
	});
	cells = newBoard;
	cellHistory.push(cells);
	cellsAlive = getAliveCount();
	generation++;
}

// Returns array with cell numbers that are neighboring the given cell
function getNeighbors(cell) {
	var neighbors = [];

	var topCell = cell - width;
	var bottomCell = cell + width;
	var leftCell = cell - 1;
	var rightCell = cell + 1;
	var topLeftCell = cell - width - 1;
	var topRightCell = cell - width + 1;
	var bottomLeftCell = cell + width - 1;
	var bottomRightCell = cell + width + 1;
	var max = width * height;

	// Check top/bottom
	if (topCell >= 0) neighbors.push(topCell);
	if (bottomCell < max) neighbors.push(bottomCell);
	// Check left/right
	if (leftCell >= 0 && (cell + 10) % 10 !== 0) neighbors.push(leftCell);
	if (rightCell < max && (cell + 1) % 10 !== 0) neighbors.push(rightCell);
	// Check other tops
	if (topLeftCell >= 0 && (cell + 10) % 10 !== 0) neighbors.push(topLeftCell);
	if (topRightCell >= 0 && (cell + 1) % 10 !== 0) neighbors.push(topRightCell);
	// Check other bottoms
	if (bottomLeftCell < max && (cell + 10) % 10 !== 0)
		neighbors.push(bottomLeftCell);
	if (bottomRightCell < max && (cell + 1) % 10 !== 0)
		neighbors.push(bottomRightCell);

	return neighbors;
}

// Returns true or false based on whether the given cell will be alive
function willBeAlive(cell) {
	var neighbors = getNeighbors(cell);
	var aliveCount = 0;
	var isAlive = cells[cell];

	for (var i = 0; i < neighbors.length; i++) {
		if (cells[neighbors[i]]) aliveCount++;
	}

	if (isAlive && aliveCount < 4 && aliveCount > 1) return true;
	else if (!isAlive && aliveCount === 3) return true;
	else return false;
}

// Returns count of alive cells
function getAliveCount() {
	var count = 0;
	cells.map(function(alive) {
		if (alive) count++;
	});
	return count;
}
//----------------------------------------
// Stats
class Stats extends React.Component {
	render() {
		var generation = this.props.generation;
		var cellCount = this.props.cellCount;
		return (
			<div className="row">
				<span className="row-label">Generation: {generation}</span>
				<span className="row-label">Cells Alive: {cellCount}</span>
			</div>
		);
	}
}
//----------------------------------------
// History
class History extends React.Component {
	render() {
		var generationCount = this.props.generations;
		var options = [];
		for (var i = 0; i <= generationCount; i++) {
			options.push(<option key={i} value={i}>{i}</option>);
		}
		return (
			<select id="history-select">
				{options}
			</select>
		);
	}
}
//----------------------------------------
