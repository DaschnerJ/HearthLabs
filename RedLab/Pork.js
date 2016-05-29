
var lookForCurious = false;
var worldCheckerId = null;

function onPorkGameLoaded() {
	
  checkMap();
  
}

/** It is fired when a foragable curio was found (once for each of them)
 * @param {Number} id ID of the curio
 * @param {String} name Name of the curio
 * @param {Object} coords Coordinates of the curio
 * @param {Number} coords.x x coordinate of the curio
 * @param {Number} coords.y y coordinate of the curio
 */
function onPorkCurioFound(id, name, coords) {
	stopAutoWalking();
	if(lookForCurious) {
		  if (g == null) {
		    return;
		  }
		  
		  print('Curio "' + name + '" found, trying to pick it...');
		  
		  while(g.getPlayerCoords().x != coords.x && g.getPlayerCoords.y != coords.y){
			  
			   if(lookForCurious) {
				   g.goTo(coords.x, coords.y);
				   sleep(1000);
		  
			 	}
			 	else
				 {
				 break;
				 }
		  }
		  g.pickItem(id);
		  sleep(5000);
		  
		  print('Picked ' + name + ".");
		  
	}	  
	startAutoWalking();
}

/** It is fired when a creature was encountered (once for each of them)
 * @param {Number} id ID of the creature 
 * @param {String} name Name of the creature
 * @param {Object} coords Coordinates of the creature
 * @param {Number} coords.x x coordinate of the creature
 * @param {Number} coords.y y coordinate of the creature
 */
function onPorkCreatureFound(id, name, coords) {
  //Nothing atm.
}

/** It is fired when another player was encountered (once for each of them)
 * @param {Number} id ID of the player
 * @param {Boolean} isKin Indicates whether the player is in the kin list or not
 * @param {Object} coords Coordinates of the player
 * @param {Number} coords.x x coordinate of the creature
 * @param {Number} coords.y y coordinate of the creature
 */
function onPorkPlayerFound(id, isKin, coords) {
  //Nothing atm.
}

/** It is fired when the flower menu appears (the one that opens after right clicking an object)
 * @param {Array} options Available flower menu options
 */
function onPorkFlowerMenuOpen(options) {
  // ignored
}

/** It is fired when the user enters a command in the console window
 * @param {String} input User command
 */
function onPorkUserInput(input) {
	if(input == 'findcurious') {
		if(lookForCurious) {
			lookForCurious = false;
			print('Curious Searched: Disabled');
		}
		else
		{
			lookForCurious = true;
			print('Curious Searched: Enabled');
		}
	}
}

/** It is fired when a chat message received from another player
 * @param {String} chat Chat name
 * @param {String} from Sender's name (or '???' if it's unknown)
 * @param {String} msg Message
 */
function onPorkChatMessage(chat, from, msg) {
  // ignored
}

/** It is fired when a new object highlighted via ALT + LMB
 * @param {Object} obj Highlighted map object
 * @param {String} obj.name Basename of the map object's resource
 * @param {String} obj.fullName Full name of the map object's resource
 * @param {Number} obj.id Map object's ID
 * @param {Object} obj.coords Coordinates of the map object
 * @param {Number} obj.coords.x x coordinate of the map object
 * @param {Number} obj.coords.y y coordinate of the map object
 */
function onPorkMapObjectHighlight(obj) {
  // ignored
}

///////////////////////
// User-defined functions
///////////////////////

/** Starts autowalking timer that will move character x+50, y+50 every second */
function startPorkAutoWalking() {
	//Nothing
}

/** Stops autowalking timer */
function stopPorkAutoWalking() {
  //Nothing
}

/** Determines whether the specified animal is aggresive (NOTE that this function is incomplete)
 * @param {String} animal Name of the animal to check
 * @return {Boolean} true if the specified animal is aggressive or false otherwise
 */
function isPorkAggr(animal) {
	return false;
}

/** Returns a mental weight of the specified curio (NOTE that this function is incomplete)
 * @param {String} curioName Name of the curio
 * @return {Number} Mental weight of the specified curio
 */
function getPorkMentalWeight(curioName) {
  //Nothing.
}

function checkMap() {
	

	worldCheckId = setInterval(function() {
	if (RedAutoWalkingSwitch)
			checkTheMap();
	}, second * 10);
	
}

function checkTheMap() {
	
	print('Checking map.');
	
	var checked = ['pine','spruce'];
	
	for(var i = 0; i < checked.size; i++) {
	
	var mapObjects = g.getMapObjects(checked[i]);
	
	print('Checking for ' + checked[i]);
	
	for(var index = 0; index < mapObjects.size() ; index++) {
		
		var map = mapObjects[index];
		
		print('Found ' + map.name + ' with id of ' + map.id);
		
	}
	
	}
	
}
