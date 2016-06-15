/**
 * 
 */

/**
 * Function called on to enable walking from path finder in priority order.
 * Order of Importance: Random, Target, None.
 */
function walk() {
	if (RedWalkDefault) {
		defaultWalk();
	}
	else if (WalkToSwitch) {
		walkTo();
	}
	else {

	}
}

/**
 * Walks to a specific point. If it gets stuck, it tries to remove itself by walking randomly. Once near set target
 * coordinates, the function turns off.
 */
function walkTo() {
	g.goTo(toX, toY);
	var playerCoords = g.getPlayerCoords();
	if (isStuck()) {
		print('Is stuck! Fixing itself.');
		RedWalkDefault = true;
		sleep(second * 5);
		RedWalkDefault = false;
		print('Try walking again.');
	}
	if (getDistance() < toP) {
		WalkToSwitch = false;
	}
}

/**
 * Method for default random walking.
 */
function defaultWalk() {
	direction();
	var playerCoords = g.getPlayerCoords();
	g.goTo(playerCoords.x + xDirection * getRandomInt(0, 200), yDirection * playerCoords.y + getRandomInt(0, 200));
	if (debug)
		print('Decrease the step count...');
	directionCount = directionCount - 1;
	if (debug)
		print('Sleep on walk...');
}

/**
 * Turns wandering on.
 */
function wanderOn() {
	RedWalkDefault = true;
}

/**
 * Turns wandering off.
 */
function wanderOff() {
	RedWalkDefault = false;
}

/**
 * Allows the player to wander randomly a bit.
 */
function wander() {
	wanderOn();
	defaultWalk();
	sleep(getRandomInt(1, 10) * second);
	wanderOff();
}

/**
 * Determines when a new direction is needed and sets a new direction and amount of steps
 * for that direction.
 */
function direction() {
	if (debug)
		print('Check if there is a direction step count or if the player is stuck...');
	if (directionCount <= 0 || isStuck()) {
		if (debug)
			print('There was not a count, pick a new one...');
		directionCount = getDirectionCount(20);
		if (debug)
			print('The direction count is now ' + directionCount + '.');

		xDirection = getDirection();
		if (debug)
			print('The x direction is now ' + xDirection + '.');
		yDirection = getDirection();
		if (debug)
			print('The y direction is now ' + yDirection + '.');
	}
}

/**
 * Determines if the bot is stuck or not.
 * @returns {Boolean} returns true if the bot is stuck, false if it is not.
 */
function isStuck() {
	var playerCoords = g.getPlayerCoords();
	if (oldPlayerX == playerCoords.x && oldPlayerY == playerCoords.y) {
		if (isStuckCooldown <= 0 && !ignoreStuckCount) {
			if (debug)
				print('Player is stuck!');
			oldPlayerX = 0;
			oldPlayerY = 0;
			isStuckCooldown = 5;
			return true;
		}
		else {
			isStuckCooldown--;
			return false;
		}

	}
	else {
		oldPlayerX = playerCoords.x;
		oldPlayerY = playerCoords.y;
		return false;
	}
}
/**
 * Checks the distance of the object to the player against the target object.
 * If the checked object is closer than target object, then the target is changed to the checked object.
 */
function currentCloserDistanceToObject(Object) {
	var dx = playerCoords.x - Object.coords.x;
	var dy = playerCoords.y - Object.coords.y;
	var distanceToObject = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
	if (debug) {
		print("dx, dy: " + dx + "," + dy);
		print('Testing distance to log: ' + distanceToObject.name + ', ' + distanceToObject.id + ', ' + distanceToObject.coords.x + ', ' + distanceToObject.coords.y);
		print('Distance to the log is: ' + distanceToLog);
	}
	if (nearestObject == null || distanceToObject < nearestObjectDistance || nearestObjectDistance == null) {
		nearestObject = distanceToObject;
		nearestObjectDistance = distanceToObject;
		if (debug) {
			print('Distance to the closest log is: ' + nearestLogDistance);
		}
	}
	return distanceToObject;
}

/**
 * Walks to the given object and returns true if it is near the object and flase if it isn't.
 */
function walkToObject(Object) {
	walkToSet(Object.coords.x + getRandomInt(-20, 20), Object.coords.y + getRandomInt(-20, 20), 10);
	if (getDistance() < toP) {
		if (debug)
			print('Is near Object.')
		return true;
	}
	else {
		if (debug)
			print('Is not near the Object, walking closer.')
		walkTo();
		if (isStuck()) {
			wander();
		}
		return false;
	}
}