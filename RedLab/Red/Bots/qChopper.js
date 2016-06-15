/**
 * 
 */

function qChopper() {
	var tree;
	var atTree;
	var choppedTrees = new Array();
	var treeCutCount = 0;
	var finishedChopping = false;

	/**
	 * The run function for this bot.
	 * Runs the AI in order that the bot performs it in the asynchronous thread.
	 */
	this.runChopper = function() {
		if (qChopperRun) {
			stamina();
			if (tree == null)
				findTree();
			if (goToTree()) {
				chopTree();
			}
			if (treeCutCount != 0)
				if (finishedChopping)
					goHome();
		}
	}

	/**
	 * Finds a tree to cut down and sets it as the target tree.
	 */
	var findTree = function() {

		var playerCoords = g.getPlayerCoords();

		var nearestTreeDistance = null;
		var distanceToTree = null;

		var mapObjects = g.getAllMapObjects();

		for (var i = 0; i < mapObjects.length; ++i) {
			if (mapObjects[i].name == 'body') {
				continue;
			}
			else if (isTree(mapObjects[i].name)) {
				var alreadyChopped = false;
				if (choppedTrees != null) {
					for (var b = 0; b < choppedTrees.length; ++b) {
						if (choppedTrees[i] == mapObjects[i].id)
							alreadyChopped = true;
					}
				}
				if (!alreadyChopped) {


					var dx = playerCoords.x - mapObjects[i].coords.x;
					var dy = playerCoords.y - mapObjects[i].coords.y;
					distanceToTree = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
					if (debug) {
						print("dx, dy: " + dx + "," + dy);
						print('Testing distance to tree: ' + mapObjects[i].name + ', ' + mapObjects[i].id + ', ' + mapObjects[i].coords.x + ', ' + mapObjects[i].coords.y);
						print('Distance to the tree is: ' + distanceToTree);
					}
					if (tree == null || distanceToTree < nearestTreeDistance || nearestTreeDistance == null) {
						tree = mapObjects[i];
						nearestTreeDistance = distanceToTree;
						if (debug) {
							print('Distance to the closest tree is: ' + nearestTreeDistance);
						}
					}
				}
			}
			else {

			}
		}
		if (tree == null) {
			wander();
		}
	}

	/**
	 * Goes to the target tree and returns true if at the target, otherwise returns false.
	 */
	var goToTree = function() {
		walkToSet(tree.coords.x + getRandomInt(-20, 20), tree.coords.y + getRandomInt(-20, 20), 10);
		if (getDistance() < toP) {
			if (debug)
				print('Is near tree.')
			return true;
		}
		else {
			if (debug)
				print('Is not near the tree, walking closer.')
			walkTo();
			if (isStuck()) {
				wander();
			}
			return false;
		}

	}

	/**
	 * Chops the target tree down.
	 */
	var chopTree = function() {

		g.mapObjectRightClick(tree.id);
		sleep(second * 1);
		finishedChopping = false;

		g.chooseFlowerMenuOption('Chop');
		sleep(second * 20);
		if (debug)
			print('Chopping and waiting for task to finish.');
		g.waitForTaskToFinish();
		if (debug)
			print('Task finished, checking if the tree is still there.');
		if (treeCutCount <= 10) {
			treeCutCount++;
			if (debug)
				print('Target tree probably still there, count is: ' + treeCutCount);

		}
		else {
			if (debug)
				print('Target tree probably not still there...');

			finishedChopping = true;
			treeCutCount = 0;
			choppedTrees.push(tree.id);
			tree = null;

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