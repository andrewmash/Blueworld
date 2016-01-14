var cells = [];
var worldLength = 100;
var worldWidth = 200;

var seed = function(array) {
	array = [];
	var row = [];
	for (var i = 0; i < worldLength; i++) {
		for (var j = 0; j < worldWidth; j++) {
			if (Math.random() < 0.3) {
				row.push(true);
			} else {
				row.push(false);
			}
		}
		array.push(row);
		row = [];
	}
	return array;
};

var printArray = function(array) {
	var output = "";
	for(var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[i].length; j++) {
			if (array[i][j] === true) {
				output += "0";
			} else {
				output += " ";
			}
		}
		output += "<br/>";
	}
	return output;
};

var simulate = function(input) {
	var output = [];
	var outputRow = [];
	for (var i = 0; i < worldLength; i++) {
		for (var j = 0; j < worldWidth; j++) {
			outputRow.push(isItAlive(input, i, j, input[i][j]));
		}
		output.push(outputRow);
		outputRow = [];
	}
	return output;
}

var isItAlive = function(world, latitude, longitude, cell) {
	var population = 0;
	for (var i = -1; i <= 1; i++) {
		for (var j = -1; j <= 1; j++) {
			if (world[wrap(latitude + i, worldLength)][wrap(longitude + j, worldWidth)] === true && !(i === 0 && j === 0)) {
				population++;
			} 
		}
	}
	/*
    Any live cell with fewer than two live neighbours dies, as if caused by under-population.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any live cell with more than three live neighbours dies, as if by over-population.
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
	*/
	if (cell === true) {
		if (population < 2 || population > 3) {
			return false;
		}
		return true;
	} else {
		if (population !== 3) {
			return false;
		}
		return true;
	}
};

var wrap = function(num, size) {
	if (num < 0) {
		return size - 1;
	}
	if (num >= size) {
		return 0;
	}
	return num;
}

cells = seed(cells);
window.setInterval(function() {
	$('p').html(printArray(cells));
	cells = simulate(cells);
}, 100);