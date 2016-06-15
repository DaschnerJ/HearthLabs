/**
 * 
 */

function qBoughPicker() {
	var tree;
	var atTree;
	var pickedTrees = new Array();
	var treePickCount = 0;
	var finishedPicking = false;

	var invFull = false;

	var goingBackToPile = false;
	var fullStockpiles = new Array();
	var stockpile;
	var atStockpile;

	/**
	 * The run function for this bot.
	 * Runs the AI in order that the bot performs it in the asynchronous thread.
	 */
	this.runBoughPicker = function() {
		if (qBoughPickerRun) {
			stamina();
			checkInventorySpace();
			if (invFull) {
				goBackToPile();
				findClosestEmptyStockpile();
				goToStockpile();
				storeStockpile();
				goGoBackPicking();
			}
			else {
				if (tree == null)
					findTree();
				if (goToTree()) {
					pickTree();
				}
				if (treePickCount != 0)
					if (finishedPicking)
						goHome();
			}
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
				if (pickedTrees != null) {
					for (var b = 0; b < pickedTrees.length; ++b) {
						if (pickedTrees[i] == mapObjects[i].id)
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
	var pickTree = function() {

		g.mapObjectRightClick(tree.id);
		sleep(second * 1);
		finishedPicking = false;

		g.chooseFlowerMenuOption('Take bough');
		sleep(second * 20);
		if (debug)
			print('picking and waiting for task to finish.');
		g.waitForTaskToFinish();
		if (debug)
			print('Task finished, checking if the tree is still there.');
		if (treePickCount <= 10) {
			treePickCount++;
			if (debug)
				print('Target tree probably still there, count is: ' + treePickCount);

		}
		else {
			if (debug)
				print('Target tree probably not still there...');

			finishedPicking = true;
			treePickCount = 0;
			pickedTrees.push(tree.id);
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

	var checkInventorySpace = function() {
		if (!goingBackToPile) {
			var boughInvWidth = g.getCharInvSize().width;
			var boughInvHeight = g.getCharInvSize().height;
			var xCoordInv = new Array();
			var yCoordInv = new Array();
			var freeSpace = 0;
			var invMatrix = g.getCharInvCellsUsageMatrix();
			for(var i = 0; i < boughInvWidth; i++)
				{
					for(var j = 0; j < boughInvHeight-1; j++)
						{
							if(invMatrix(i,j) == 0)
								{
									if(invMatrix(i,j+1) == 0)
										{
											if(!arrayContains(xCoordInv,i) || (!arrayContains(yCoordInv, j) && !arrayContains(yCoordInv, j+1)))
												{
													XCoordInv.push(i);
													yCoordInv.push(j);
													yCoordInv.push(j+1);
													freeSpace++;
												}
										}
								}
						}
				}
			if(freeSpace < 5)
				invFull = true;
			else
				infFull = false;
		}
	}

	var goBackToPile = function() {
		if (goingBackToPile) {

		}
		else {
			goHome();
			goingBackToPile = true;
		}


	}

	var findClosestEmptyStockPile = function() {
		var playerCoords = g.getPlayerCoords();

		var nearestStockpile = null;
		var distanceToStockpile = null;

		var mapObjects = g.getAllMapObjects();

		for (var i = 0; i < mapObjects.length; ++i) {
			if (mapObjects[i].name == 'body') {
				continue;
			}
			else if (isBoughStockpile(mapObjects[i].name)) {
				var alreadyStored = false;
				if (fullStockpiles != null) {
					for (var b = 0; b < fullStockpiles.length; ++b) {
						if (fullStockpiles[i] == mapObjects[i].id)
							alreadyStored = true;
					}
				}
				if (!alreadyStored) {


					var dx = playerCoords.x - mapObjects[i].coords.x;
					var dy = playerCoords.y - mapObjects[i].coords.y;
					distanceToStockpile = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
					if (debug) {
						print("dx, dy: " + dx + "," + dy);
						print('Testing distance to stockpile: ' + mapObjects[i].name + ', ' + mapObjects[i].id + ', ' + mapObjects[i].coords.x + ', ' + mapObjects[i].coords.y);
						print('Distance to the stockpile is: ' + distanceToStockpile);
					}
					if (tree == null || distanceToStockpile < nearestStockpile || nearestStockpile == null) {
						tree = mapObjects[i];
						nearestStockpile = distanceToStockpile;
						if (debug) {
							print('Distance to the closest stockpile is: ' + nearestStockpile);
						}
					}
				}
			}
			else {

			}
		}
		if (stockpile == null) {
			wander();
		}
	}

	var goToStockpile = function() {
		walkToSet(stockpile.coords.x + getRandomInt(-20, 20), stockpile.coords.y + getRandomInt(-20, 20), 10);
		if (getDistance() < toP) {
			if (debug)
				print('Is near stockpile.')
			return true;
		}
		else {
			if (debug)
				print('Is not near the stockpile, walking closer.')
			walkTo();
			if (isStuck()) {
				wander();
			}
			return false;
		}

	}

	var storeStockpile = function() {
		g.mapObjectRightClick(stockpile.id);

		sleep(second);
		if (g.getStockpileInfo() != null) {

			stockpileInfo = g.getStockpileInfo();

			print('Putting boughes into stockpile...');

			var items = g.getInvItems();

			var space = stockpileInfo.total;

			var taken = stockpileInfo.used;

			for (var i = 0; i < items.length; i++) {
				if (items[i] == 'bough') {
					if (taken < space) {

						sleep(second);

						g.takeItem(items[i]);

						sleep(second);

						g.useItemFromHandOnObject(stockpile.id);

						sleep(second * 0.5);

						taken++;

					}
					else {

						fullStockpiles.push(stockpile);
						stockpile = null;
					}

					break;

				}

			}
		}
	}
	
	var checkInventoryForBoughes = function()
	{
		var items = g.getInvItems();
		for (var i = 0; i < items.length; i++) {
			if (items[i] == 'bough') {
				return true;
			}
		}
		return false;
	}
	
	var goGoBackPicking = function()
	{
		if(checkInventoryForBoughes)
			{
				
			}
		else
			{
				goingBackToPile = false;
				invFull = false;
				tree = null;
				atTree = false;
				atStockpile = false;
				stockpile = null;
				treePickCount = 0;
			}
	}

}