/**
 * 
 */
function BeastWatcher() {
	//Variables
	var HostileBeastsList = new Array();
	var PlayerBeastsList = new Array();
	var FriendlyBeastsList = new Array();

	var HostileBeastToleranceDistance = 200;
	var UnknownPlayerBeastToleranceDistance = 200;
	var FriendBeastToerlanceDistance = 200;

	/**
	 * The run function for this bot.
	 * Runs the AI in order that the bot performs it in the asynchronous thread.
	 */
	this.runBeastWatcher = function() {
		if (BeastWatcherRun) {
			updateBeastsList();
			checkBeastDistances();
		}
	}

	var listContains = function(list, object) {
		if (list != null) {
			for (var x = 0; x < list.length; x++) {
				if (list[x] == object) {
					return true;
				}
			}
		}
		return false;
	}

	var updateBeastsList = function() {
		var mapObjects = g.getAllMapObjects();

		for (var i = 0; i < mapObjects.length; ++i) {
			if (mapObjects[i].name == 'body') {
				continue;
			}
			else if (isHostileBeast(mapObjects[i].name)) {
				if (!listContains(HostileBeastsList, mapObjects[i])) {
					HostileBeastsList.push(mapObjects[i]);
				}
			}
			else if (isUnknownPlayer(mapObjects[i].name)) {
				if (!listContains(PlayerBeastsList, mapObjects[i])) {
					PlayerBeastsList.push(mapObjects[i]);
				}
			}
			else if (isFriendlyBeast(mapObjects[i].name)) {
				if (!listContains(FriendlyBeastsList, mapObjects[i])) {
					FriendlyBeastsList.push(mapObjects[i]);
				}
			}
		}
	}

	var checkBeastDistances = function() {
		if (AllowHostile) {
			for (var i = 0; i < HostileBeastsList.length; i++) {
				if (getDistance(HostileBeastsList[i].coords) < HostileBeastToleranceDistance) {
					goHome();
				}
			}
		}
		if (AllowPlayer) {
			for (var i = 0; i < PlayerBeastsList.length; i++) {
				if (getDistance(PlayerBeastsList[i].coords) < UnknownPlayerBeastToleranceDistance) {
					goHome();
				}
			}
		}
		if (AllowFriendly) {
			for (var i = 0; i < FriendlyBeastsList.length; i++) {
				if (getDistance(FriendlyBeastsList[i].coords) < FriendlyBeastToleranceDistance) {
					goHome();
				}
			}
		}
	}

	var goHome = function() {
		hearthHome();
	}


}