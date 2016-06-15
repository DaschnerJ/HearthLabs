/**
 * 
 */
function qBlockChopper() {
	var block;
	var atBlock;
	var choppedBlocks = new Array();
	var blockCutCount = 0;
	var finishedChopping = false;

	/**
	 * The run function for this bot.
	 * Runs the AI in order that the bot performs it in the asynchronous thread.
	 */
	this.runBlockChopper = function() {
		if (qBlockChopperRun) {
			stamina();
			if (block == null)
				findBlock();
			if (goToBlock()) {
				chopBlock();
			}
			if (blockCutCount != 0)
				if (finishedChopping)
					goHome();
		}
	}

	/**
	 * Finds the next available target block to chop.
	 */
	var findBlock = function() {

		var playerCoords = g.getPlayerCoords();

		var nearestBlockDistance = null;
		var distanceToBlock = null;

		var mapObjects = g.getAllMapObjects();

		for (var i = 0; i < mapObjects.length; ++i) {
			if (mapObjects[i].name == 'body') {
				continue;
			}
			else if (isLog(mapObjects[i].name)) {
				var alreadyChopped = false;
				if (choppedBlocks != null) {
					for (var b = 0; b < choppedBlocks.length; ++b) {
						if (choppedBlocks[i] == mapObjects[i].id)
							alreadyChopped = true;
					}
				}
				if (!alreadyChopped) {


					var dx = playerCoords.x - mapObjects[i].coords.x;
					var dy = playerCoords.y - mapObjects[i].coords.y;
					distanceToBlock = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
					if (debug) {
						print("dx, dy: " + dx + "," + dy);
						print('Testing distance to block: ' + mapObjects[i].name + ', ' + mapObjects[i].id + ', ' + mapObjects[i].coords.x + ', ' + mapObjects[i].coords.y);
						print('Distance to the block is: ' + distanceToBlock);
					}
					if (block == null || distanceToBlock < nearestBlockDistance || nearestBlockDistance == null) {
						block = mapObjects[i];
						nearestBlockDistance = distanceToBlock;
						if (debug) {
							print('Distance to the closest block is: ' + nearestBlockDistance);
						}
					}
				}
			}
			else {

			}
		}
		if (block == null) {
			wander();
		}
	}

	/**
	 * Goes to the target block and returns true if near the log, otherwise returns false.
	 */
	var goToBlock = function() {
		walkToSet(block.coords.x + getRandomInt(-20, 20), block.coords.y + getRandomInt(-20, 20), 10);
		if (getDistance() < toP) {
			if (debug)
				print('Is near block.')
			return true;
		}
		else {
			if (debug)
				print('Is not near the block, walking closer.')
			walkTo();
			if (isStuck()) {
				wander();
			}
			return false;
		}

	}

	/**
	 * Chops the target block.
	 */
	var chopBlock = function() {

		g.mapObjectRightClick(block.id);
		sleep(second * 1);
		finishedChopping = false;

		g.chooseFlowerMenuOption('Chop into blocks');
		sleep(second * 20);
		if (debug)
			print('Chopping and waiting for task to finish.');
		g.waitForTaskToFinish();
		if (debug)
			print('Task finished, checking if the block is still there.');
		if (blockCutCount <= 10) {
			blockCutCount++;
			if (debug)
				print('Target block probably still there, count is: ' + blockCutCount);

		}
		else {
			if (debug)
				print('Target block probably not still there...');

			finishedChopping = true;
			blockCutCount = 0;
			choppedBlocks.push(block.id);
			block = null;

		}
	}

	/**
	 * A method to stop walking and start regenerating stamina.
	 */
	var stamina = function() {

		WalkToSwitch = false;
		RedWalkDefault = false;
		waitForStamina(95);

	}

	/**
	 * A method to go home if needed.
	 */
	var goHome = function() {
		hearthHome();
	}



}