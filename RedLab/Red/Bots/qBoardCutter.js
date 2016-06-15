/**
 * 
 */
function qBoardCutter() {
	var board;
	var atBoard;
	var sawedBoards = new Array();
	var boardCutCount = 0;
	var finishedChopping = false;

	/**
	 * The run function for this bot.
	 * Runs the AI in order that the bot performs it in the asynchronous thread.
	 */
	this.runBoardCutter = function() {
		if (qBoardCutterRun) {
			stamina();
			if (board == null)
				findBoard();
			if (goToBoard()) {
				sawBoard();
			}
			if (boardCutCount != 0)
				if (finishedChopping)
					goHome();
		}
	}

	/**
	 * Finds the next available target board to saw.
	 */
	var findBoard = function() {

		var playerCoords = g.getPlayerCoords();

		var nearestBoardDistance = null;
		var distanceToBoard = null;

		var mapObjects = g.getAllMapObjects();

		for (var i = 0; i < mapObjects.length; ++i) {
			if (mapObjects[i].name == 'body') {
				continue;
			}
			else if (isLog(mapObjects[i].name)) {
				var alreadyChopped = false;
				if (sawedBoards != null) {
					for (var b = 0; b < sawedBoards.length; ++b) {
						if (sawedBoards[i] == mapObjects[i].id)
							alreadyChopped = true;
					}
				}
				if (!alreadyChopped) {


					var dx = playerCoords.x - mapObjects[i].coords.x;
					var dy = playerCoords.y - mapObjects[i].coords.y;
					distanceToBoard = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
					if (debug) {
						print("dx, dy: " + dx + "," + dy);
						print('Testing distance to board: ' + mapObjects[i].name + ', ' + mapObjects[i].id + ', ' + mapObjects[i].coords.x + ', ' + mapObjects[i].coords.y);
						print('Distance to the board is: ' + distanceToBoard);
					}
					if (board == null || distanceToBoard < nearestBoardDistance || nearestBoardDistance == null) {
						board = mapObjects[i];
						nearestBoardDistance = distanceToBoard;
						if (debug) {
							print('Distance to the closest board is: ' + nearestBoardDistance);
						}
					}
				}
			}
			else {

			}
		}
		if (board == null) {
			wander();
		}
	}

	/**
	 * Goes to the target board and returns true if near the log, otherwise returns false.
	 */
	var goToBoard = function() {
		walkToSet(board.coords.x + getRandomInt(-20, 20), board.coords.y + getRandomInt(-20, 20), 10);
		if (getDistance() < toP) {
			if (debug)
				print('Is near board.')
			return true;
		}
		else {
			if (debug)
				print('Is not near the board, walking closer.')
			walkTo();
			if (isStuck()) {
				wander();
			}
			return false;
		}

	}

	/**
	 * Chops the target board.
	 */
	var sawBoard = function() {

		g.mapObjectRightClick(board.id);
		sleep(second * 1);
		finishedChopping = false;

		g.chooseFlowerMenuOption('Make boards');
		sleep(second * 20);
		if (debug)
			print('Chopping and waiting for task to finish.');
		g.waitForTaskToFinish();
		if (debug)
			print('Task finished, checking if the board is still there.');
		if (boardCutCount <= 10) {
			boardCutCount++;
			if (debug)
				print('Target board probably still there, count is: ' + boardCutCount);

		}
		else {
			if (debug)
				print('Target board probably not still there...');

			finishedChopping = true;
			boardCutCount = 0;
			sawedBoards.push(board.id);
			board = null;

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