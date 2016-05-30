
function onRedGameLoaded() {
	
  gameStart();
  
}

/** It is fired when a foragable curio was found (once for each of them)
 * @param {Number} id ID of the curio
 * @param {String} name Name of the curio
 * @param {Object} coords Coordinates of the curio
 * @param {Number} coords.x x coordinate of the curio
 * @param {Number} coords.y y coordinate of the curio
 */
function onRedCurioFound(id, name, coords) {
  //Nothing atm.
}

/** It is fired when a creature was encountered (once for each of them)
 * @param {Number} id ID of the creature 
 * @param {String} name Name of the creature
 * @param {Object} coords Coordinates of the creature
 * @param {Number} coords.x x coordinate of the creature
 * @param {Number} coords.y y coordinate of the creature
 */
function onRedCreatureFound(id, name, coords) {
  //Nothing atm.
}

/** It is fired when another player was encountered (once for each of them)
 * @param {Number} id ID of the player
 * @param {Boolean} isKin Indicates whether the player is in the kin list or not
 * @param {Object} coords Coordinates of the player
 * @param {Number} coords.x x coordinate of the creature
 * @param {Number} coords.y y coordinate of the creature
 */
function onRedPlayerFound(id, isKin, coords) {
  //Nothing atm.
}

/** It is fired when the flower menu appears (the one that opens after right clicking an object)
 * @param {Array} options Available flower menu options
 */
function onRedFlowerMenuOpen(options) {
	if(choppingTrees)
		{
		g.chooseFlowerMenuOption('Chop');
		sleep(second*20);
		print('Chopping and waiting for task to finish.');
		g.waitForTaskToFinish();
		print('Task finished, checking if the tree is still there.');
		if(targetTreeCount <= 3)
		{
			regenStamina();
			walkTo(targetTree.x+getRandomInt(-20,20), targetTree.y+getRandomInt(-20,20), 10);
			chopTree();
			targetTreeCount = targetTreeCount+1;
			onRedFlowerMenuOpen(options);
		}
		else
		{
			inishedCutting = true;
			targetTreeCount = 0;
			treeChoppedList.push(targetTree);
			targetTree = null;
			chopWood();
		
		}
	}
  // ignored
}

/** It is fired when the user enters a command in the console window
 * @param {String} input User command
 */
function onRedUserInput(input) {
  //Checks for red command
  if(input == 'red walk')
  {
	  walkDefaultToggle();
  }
  else if(input == 'red target walk')
  {
	  walkToToggle();
  }
  else if(input == 'red auto walk')
  {
	  walkAutoToggle();
  }
  else if(input == 'print objects')
  {
	  printObjectNamesOnScreen();
  }
  else if(input == 'chop trees')
  {
	  chopperToggle();
  }
  else if(input == 'collect logs')
  {
	  logCollectToggle();
  }
  else if(input == 'agro toggle')
  {
	  logCollectToggle();
  }
  else if(input == 'print commands')
  {
	print('red target walk, red auto walk, print objects, chop trees, print commands, collect logs, agro toggle, findcurious');  
  }
  else
  {
	  
  }
}

/** It is fired when a chat message received from another player
 * @param {String} chat Chat name
 * @param {String} from Sender's name (or '???' if it's unknown)
 * @param {String} msg Message
 */
function onRedChatMessage(chat, from, msg) {
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
function onRedMapObjectHighlight(obj) {
  // ignored
}

///////////////////////
// User-defined functions
///////////////////////

/** Starts autowalking timer that will move character x+50, y+50 every second */
function startRedAutoWalking() {
	if(RedAutoWalkingSwitch)
	{
		if(debug)
		print('Start the auto walk steps...');
		autoWalkingTimerId = setInterval(function() 
		  {
			if(RedAutoWalkingSwitch)
	  		walk();
		  }, second*5);
	}
}

/** Stops autowalking timer */
function stopRedAutoWalking() {
  clearInterval(autoWalkingTimerId);
  // NOTE that clearInterval (nor clearTimeout) does NOT wait for the currently executing task to finish
  //      so let's sleep for some time manually
  sleep(second*20);
}

/** Determines whether the specified animal is aggresive (NOTE that this function is incomplete)
 * @param {String} animal Name of the animal to check
 * @return {Boolean} true if the specified animal is aggressive or false otherwise
 */
function isRedAggr(animal) {
	return false;
}

/** Returns a mental weight of the specified curio (NOTE that this function is incomplete)
 * @param {String} curioName Name of the curio
 * @return {Number} Mental weight of the specified curio
 */
function getRedMentalWeight(curioName) {
  //Nothing.
}


