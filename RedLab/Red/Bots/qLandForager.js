/**
 * 
 */

/**
 * 
 */

function qLandForager() {
	var forage;
	var atForager;
	var choppedForagers = new Array();
	var forageAttemptCount = 0;
	var finishedCollecting = false;

	/**
	 * The run function for this bot.
	 * Runs the AI in order that the bot performs it in the asynchronous thread.
	 */
	this.runLandForager = function() {
		if (qLandForagerRun) {
			stamina();
			if (forage == null)
				findForage();
			if(forage != null)
				if (goToForage()) {
					collectForage();
			}
		}
	}

	/**
	 * Finds a forage to collect and sets it as the target forage.
	 */
	var findForage = function() {

		var playerCoords = g.getPlayerCoords();

		var nearestForagerDistance = null;
		var distanceToForager = null;

		var mapObjects = g.getAllMapObjects();

		for (var i = 0; i < mapObjects.length; ++i) {
			if (mapObjects[i].name == 'body') {
				continue;
			}
			else if (isForage(mapObjects[i].fullName)) {
				var alreadyForaged = false;
				if (choppedForagers != null) {
					for (var b = 0; b < choppedForagers.length; ++b) {
						if (choppedForagers[i] == mapObjects[i].id)
							alreadyForaged = true;
					}
				}
				if (!alreadyForaged) {


					var dx = playerCoords.x - mapObjects[i].coords.x;
					var dy = playerCoords.y - mapObjects[i].coords.y;
					distanceToForager = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
					if (debug) {
						print("dx, dy: " + dx + "," + dy);
						print('Testing distance to forage: ' + mapObjects[i].name + ', ' + mapObjects[i].id + ', ' + mapObjects[i].coords.x + ', ' + mapObjects[i].coords.y);
						print('Distance to the forage is: ' + distanceToForager);
					}
					if (forage == null || distanceToForager < nearestForagerDistance || nearestForagerDistance == null) {
						forage = mapObjects[i];
						nearestForagerDistance = distanceToForager;
						if (debug) {
							print('Distance to the closest forage is: ' + nearestForagerDistance);
						}
					}
				}
			}
			else {

			}
		}
		if (forage == null) {
			print('Wandering to find foragables...');
			wander();
		}
	}

	/**
	 * Goes to the target forage and returns true if at the target, otherwise returns false.
	 */
	var goToForage = function() {
		walkToSet(forage.coords.x + getRandomInt(-20, 20), forage.coords.y + getRandomInt(-20, 20), 10);
		if (getDistance() < toP) {
			if (debug)
				print('Is near forage.')
			return true;
		}
		else {
			if (debug)
				print('Is not near the forage, walking closer.')
			walkTo();
			if (isStuck()) {
				wander();
			}
			return false;
		}

	}

	/**
	 * Chops the target forage down.
	 */
	var collectForage = function() {

		g.mapObjectRightClick(forage.id);
		sleep(second * 1);
		finishedCollecting = false;

		g.chooseFlowerMenuOption('Pick');
		sleep(second * 20);
		if (debug)
			print('Picking and waiting for task to finish.');
		g.waitForTaskToFinish();
		if (debug)
			print('Task finished, checking if the forage is still there.');
		if (forageAttemptCount <= 1) {
			forageAttemptCount++;
			if (debug)
				print('Target forage probably still there, count is: ' + forageAttemptCount);

		}
		else {
			if (debug)
				print('Target forage probably not still there...');

			finishedCollecting = true;
			forageAttemptCount = 0;
			choppedForagers.push(forage.id);
			forage = null;

		}
	}

	/**
	 * A method to stop walking and start regenerating stamina.
	 */
	var stamina = function() {

		WalkToSwitch = false;
		RedWalkDefault = false;
		waitForStamina(50);

	}

	/**
	 * A method to go home if needed.
	 */
	var goHome = function() {
		hearthHome();
	}



}