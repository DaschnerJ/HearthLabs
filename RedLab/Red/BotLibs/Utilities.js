/**
 * 
 */

/**
 * Sets the target coordinates to walk to and begins walking to the target coordinates.
 */
function walkToStart(x, y, precision) {
	walkToSet(x, y, precision);
	walkTo();
}

/**
 * Sets the walk to target without invoking walkTo();
 */
function walkToSet(x, y, precision) {
	toX = x;
	toY = y;
	toP = precision;
	WalkToSwitch = true;
}

/**
 * Gets an integer between min and max values.
 * @param min - the minimum value the integer could be.
 * @param max - the maximum value the integer could be.
 * @returns The randomly chosen integer. 
 */
function getRandomInt(min, max) {
	return Math.random() * (max - min) + min;
}

/**
 * Gets an integer that is either 1 or -1 but not 0.
 * @returns {Number} returned is 1 or -1 which is a direction.
 */
function getDirection() {
	var c = Math.random() * (1 - -1) + -1;
	c = c.toFixed(0);
	if (c == 0) {
		return getDirection();
	}

	return c;
}

/** Gets a random direction step count between 0 an max.
 * @param max The maximum amount of steps the bot is able to take in a direction.
 * @returns Returns a number between 0 and max.
 */
function getDirectionCount(max) {
	return getRandomInt(0, Math.abs(max)).toFixed(0);
}

/**
 * Gets the distance between object1.coords and object2.coords.
 * @param objectOne Is the first object1.coords, usually the player.
 * @param ObjectTwo Is the second object2.coords.
 * @returns Returns the distance between two objects in tile length.
 */
function getDistance(objectOne, ObjectTwo) {
	var dx = objectOne.x - ObjectTwo.x;
	var dy = objectOne.y - ObjectTwo.y;
	return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

/**
 * Gets the distance of an object to the target coordinates.
 * @param objectOne The object1.coords to find distance from target coordinates.
 * @returns Returns the distance of the object from the target coordinates in tiles length.
 */
function getDistance(objectOne) {
	var dx = objectOne.x - toX;
	var dy = objectOne.y - toY;
	return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

/**
 * Gets the distance of the player from the target coordinates.
 * @returns Returns the distance of the player from the target coordinates in tiles in tiles length.
 */
function getDistance() {
	var playerCoords = g.getPlayerCoords();
	var dx = playerCoords.x - toX;
	var dy = playerCoords.y - toY;
	return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

/**
 * Hearths the player back home.
 */
function hearthHome() {
	sleep(second * 2);
	g.travelToHearthFire();
	sleep(second * 1);
	g.waitForTaskToFinish();
}

function regenStamina() {
	WalkToSwitch = false;
	RedWalkDefault = false;
	waitForStamina(95);
}

function waitForStamina(target) {
	stamina = g.getStamina()
	if (stamina < target) {
		var secondsToWait = Math.ceil((target - stamina) * 6.666);
		print('Stamina not enough, it is: ' + stamina);
		print('Waiting ' + secondsToWait + ' seconds...')
		sleep(second * secondsToWait);
		print('Checking stamina again...')
		waitForStamina(target);
	}
}

function pickOption(option, options) {
	if (options.length != null || options.length == 0) {
		print('Options length is: ' + options.length)
		for (var i = 0; i < options.length; i++) {
			print(option[i]);
			if (options[i] == option) {

				g.chooseFlowerMenuOption(option);
				return true;

			}
		}
	}
	return false;

}

function arrayContains(array, value)
{
	for(var i = 0; i < array.length; i++)
		{
			if(array[i] == value)
				return true;
		}
	return false;
	}