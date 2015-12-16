var oldGen = [];
var newGen = [];
var worldLength = 8;
var worldWidth = 8;

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
				output += "*";
			} else {
				output += "+";
			}
		}
		output += "\n";
	}
	return output;
};

var simulate = function(input) {
	var output = [];
	var outputRow = [];
	for (var i = 0; i < input.length; i++) {
		for (var j = 0; j < input.length; j++) {
			outputRow.push(isItAlive(input, i, j, input[i][j]));
		}
		output.push(outputRow);
	}
	return output;
}

var isItAlive = function(world, latitude, longitude, cell) {
	var population = 0;
	for (var i = (latitude - 1) % worldLength; i <= (latitude + 1) % (worldLength - 1); i++) {
		for (var j = (longitude - 1) % worldWidth; j <= (longitude + 1) % (worldWidth - 1); j++) {
			if (world[i][j] === true && !(i === latitude && j == longitude)) {
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

oldGen = seed(oldGen);
for (var i = 0; i < 100; i++) {
	newGen = simulate(oldGen);
	oldGen = newGen;
	console.log(printArray(oldGen));
	sleep(3000);
}
