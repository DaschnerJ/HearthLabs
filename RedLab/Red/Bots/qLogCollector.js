/**
 * 
 */

function qLogCollector() {
	var log;
	var atLog;
	var collectedLogs = new Array();
	var logCollectCount = 0;
	var finishedCollecting = false;
	var goingToStockPile = false;

	var hearthLogX = null;
	var hearthLogY = null;

	var coords = new Array();
	/**
	 * The run function for this bot.
	 * Runs the AI in order that the bot performs it in the asynchronous thread.
	 */
	this.runLoger = function() {
		if (hearthLogX == null || herthLogY == null) {
			var playerCoords = g.getPlayerCoords();
			hearthLogX = playerCoords.coords.x;
			hearthLogY = playerCoords.coords.y;
		}
		if (qLogerRun) {
			stamina();
			if (!finishedCollecting) {
				findLog();
				if (goToLog()) {
					pickUpLog();
					goHome();
				}
			}
			if (finishedCollecting) {
				if (!goingToStockPile) {

					coords = getStockPosition();
					goToStockpile(coords[0], coords[1]);
				}
				else if (logCollectCount < 10) {
					goToStockpile(coords[0], coords[1]);
					logCollectCount++;
				}
				else {
					logCollectCount = 0;
					goHome();
					collectedLogs.push(log);
					log = null;
					finishedCollect = false;
					atLog = false;
				}
			}
		}
	}

	var findLog = function() {

		var playerCoords = g.getPlayerCoords();

		var nearestLogDistance = null;
		var distanceToLog = null;

		var mapObjects = g.getAllMapObjects();

		for (var i = 0; i < mapObjects.length; ++i) {
			if (mapObjects[i].name == 'body') {
				continue;
			}
			else if (isLog(mapObjects[i].name)) {
				var alreadyRemoved = false;
				if (collectedLogs != null) {
					for (var b = 0; b < collectedLogs.length; ++b) {
						if (collectedLogs[i] == mapObjects[i].id)
							alreadyRemoved = true;
					}
				}
				if (!alreadyRemoved) {


					var dx = playerCoords.x - mapObjects[i].coords.x;
					var dy = playerCoords.y - mapObjects[i].coords.y;
					distanceToLog = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
					if (debug) {
						print("dx, dy: " + dx + "," + dy);
						print('Testing distance to log: ' + mapObjects[i].name + ', ' + mapObjects[i].id + ', ' + mapObjects[i].coords.x + ', ' + mapObjects[i].coords.y);
						print('Distance to the log is: ' + distanceToLog);
					}
					if (log == null || distanceToLog < nearestLogDistance || nearestLogDistance == null) {
						log = mapObjects[i];
						nearestLogDistance = distanceToLog;
						if (debug) {
							print('Distance to the closest log is: ' + nearestLogDistance);
						}
					}
				}
			}
			else {

			}
		}
		if (log == null) {
			wander();
		}
	}

	var goToLog = function() {

		return walkToObject(log);

	}

	var pickUpLog = function() {
		if (!finishedCollecting) {
			if (g.liftObject(log.id)) {
				if (debug)
					print('Lifting log.')
				finishedCollecting = true;

			}
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

	var getStockPosition = function() {
		var mapObjects = g.getAllMapObjects();
		//Offset along x axis (<==)
		var c = 50;
		//Offset along y axis (V==)
		var b = -200;
		//Offset coordinates from the hearth fire for bottom left corner of the stockpile.
		var xI = hearthLogX + c;
		var yI = hearthLogY + b;
		//How much to increment the coordinates check on each axis from initial.
		var increment = 1;
		//How much space has to be between each log.
		var space = 5;

		//The array to store the found coordinates in.
		var placeCoords = new Array();
		//Make sure there is something on the screen, otherwise this is pointless.
		if (mapObjects != null) {
			//For each block yi, check per yi+1 (going up towards hearth fire)
			//as long as yi is less than the hearth fire location minus ten degrees.
			for (var yi = yI; yi < hearthLogY-10; yi + increment) {
				//For each block xi, check per xi-1 (going right)
				//as long as xi is greater than the far right x final position.
				for (var xi = xI; xi > xI - 2 * c; xi - increment) {
					//Place the coordinates in the map to verify if these coordinates are true
					//and to return later if they are true.
					placeCoords.push(xi);
					placeCoords.push(yi);
					//For each object, check the coordinate isn't in a radius of another object
					//at that location.
					for (var i = 0; i < mapObjects.size(); i++) {
						//Find the max possible x position an object has to be outside of.
						var mX = xi + space;
						//Find the max possible y position an object has to be outside of.
						var mY = yi + space;
						//Find the minimum possible x position an object has to be outside of.
						var nX = xi - space;
						//Find the minimum possible y position an object has to be outside of.
						var nY = yi - space;
						//Get the x coordinates of the object.
						var oX = mapObjects[i].coords.x;
						//get the y coordinates of the object.
						var oY = mapObjects[i].coords.y;
						//If the object is in between both min and max bounds then it is within the radius coordinates.
						if (nX < oX < mX && nY < oY < mY) {
							//These coordinates are too close to another object so pop them off the list and remove them.
							placeCoords.pop();
							placeCoords.pop();
						}
					}
					//If there were any coordinates that were not popped off, then set the for loops final conditions
					//to stop any further coordinates being added. No longer is it needed to loop for more coordinates
					//because we have at least one set.
					if (placeCoords.length() > 1) {
						yi = hearthLogY;
						xi = xI - 2 * c;
					}
				}
			}
		}
		//Set going to stock pile as true to prevent any other further actions.
		goingToStockPile = true;
		//Return the array with the x and y coordinates.
		return placeCoords;
	}

	var goToStockpile = function(sX, sY) {
		RedWalkDefault = false;
		WalkToSwitch = false;
		if (goingToStockPile) {
			g.mapRightClick(sX, sY);
		}
		else {
			g.mapRightClick(toX, toY);
		}
	}

	/**
	 * In case this code is needed again. To be removed in the next release.
	var pasteSave = function()
	{
		
		g.useMenuAction(['a', 'y']);
		sleep(second*1);
		finishedCollecting = false;
		
		g.mapRightClick(log.coords.x, log.coords.y)
		sleep(second*20);
		print('Removing and waiting for task to finish.');
		g.waitForTaskToFinish();
		print('Task finished, checking if the log is still there.');
		if(logCollectCount <= 10)
		{
			logCollectCount++;
			
			if(debug)
			print('Target log probably still there, count is: ' + logCollectCount);
			
		}
		else
		{
			if(debug)
			print('Target log probably not still there...');
			
			finishedCollecting = true;
			logCollectCount = 0;
			collectedLogs.push(log.id);
			log = null;
			
		}
	}
	*/


}