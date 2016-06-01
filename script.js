var currentSession = '2016-05-31 19.20.45';

var user = 'TheRedHun1';
var pass = 'buddy123';
var character = 'Redick';
/**
 * 
 */

/**
 * 
 */

var choppingTrees = false;
var finishedCutting = true;
var targetTree;
var stamina;
var targetTreeCount = 0;
var treeChoppedList = new Array();

function chopWood()
{
	while(choppingTrees)
	{
		print('Regenerating stamina...');
		regenStamina();
		print('Finding closest tree...');
		findClosestTree();
		print('Found closest tree! Now walking to it.');
		print('The target is: ' + targetTree.name);
		print('Chopping tree.')
		walkToStart(targetTree.coords.x+getRandomInt(-20,20), targetTree.coords.y+getRandomInt(-20,20), 10);
		if(getDistance()<toP)
		{
			print('Is near tree, now chopping the tree.')
			chopTree();
			sleep(second*5);
		}
		else
		{
			print('Is not near the tree, walking closer.')
			walkTo();
			if(isStuck())
			{
				var playerCoords = g.getPlayerCoords();
				getDirection();
				g.mapRightClick(playerCoords.x + xDirection*getRandomInt(20,40), playerCoords.y + yDirection*getRandomInt(20,40));
			}
		}
	}
}

function regenStamina()
{
	WalkToSwitch = false
	RedWalkDefault = false
	waitForStamina(95)
}

function waitForStamina(target)
{
	stamina = g.getStamina()
	if(stamina < target)
	{
		var secondsToWait = Math.ceil((target-stamina)*6.666);
		print('Stamina not enough, it is: ' + stamina);
		print('Waiting '+secondsToWait+' seconds...')
		sleep(second*secondsToWait);
		print('Checking stamina again...')
		waitForStamina(target);
	}
}

function pickOption(option, options)
{
	 
	if(options.length != null || options.length == 0)
	{
		print('Options length is: ' + options.length)
		for(var i = 0; i < options.length; i++) {
			print(option[i]);
			if(options[i] == option) {
   
				g.chooseFlowerMenuOption(option);
				return true;
   
			}
		}
	}
	return false;
	 
}

function chopTree()
{
	print('Right clicking tree with ID: ' + targetTree.id);
	g.mapObjectRightClick(targetTree.id);
	sleep(second*1);
	finishedCutting = false;
	cutTree();
	
}

function cutTree()
{
	g.chooseFlowerMenuOption('Chop');
	sleep(second*20);
	print('Chopping and waiting for task to finish.');
	g.waitForTaskToFinish();
	print('Task finished, checking if the tree is still there.');
	if(targetTreeCount <= 10)
	{
		targetTreeCount++;
		print('Target tree probably still there, count is: ' + targetTreeCount);
		regenStamina();
		walkToStart(targetTree.coords.x+getRandomInt(-20,20), targetTree.coords.y+getRandomInt(-20,20), 5);
		chopTree();
		
	}
	else
	{
		print('Target tree probably not still there...');
		sleep(second*2);
		g.travelToHearthFire();
		sleep(second*1);
		g.waitForTaskToFinish();
		finishedCutting = true;
		targetTreeCount = 0;
		treeChoppedList.push(targetTree.id);
		targetTree = null;
		chopWood();
		
	}
}


function findClosestTree()
{

	  var playerCoords = g.getPlayerCoords();
	  
	  var nearestTreeDistance = null;
	  var distanceToTree = null;
	  
	  var mapObjects = g.getAllMapObjects();
	  
	  for (var i = 0; i < mapObjects.length; ++i) 
	  {

	    if (mapObjects[i].name == 'body') {
	      continue;
	    }
	    else if(isTree(mapObjects[i].name))
	    {
	    	var alreadyChopped = false;
	    	if(treeChoppedList != null)
	    		{
	    			for (var b = 0; b < treeChoppedList.length; ++b) {
	    		
	    				if(treeChoppedList[i] == mapObjects[i].id)
	    					alreadyChopped = true;
	    			}
	    		}
	    	if(!alreadyChopped)
	    	{
	    		
	    		
	    			var dx = playerCoords.x - mapObjects[i].coords.x;
	    			var dy = playerCoords.y - mapObjects[i].coords.y;
	    			distanceToTree = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
	    			print("dx, dy: " + dx +","+dy);
	    			print('Testing distance to tree: ' + mapObjects[i].name +', '+mapObjects[i].id+', '+mapObjects[i].coords.x+', '+mapObjects[i].coords.y);
		    		print('Distance to the tree is: ' + distanceToTree);
		    		
	    		if (targetTree == null || distanceToTree < nearestTreeDistance || nearestTreeDistance == null) {
	    			targetTree = mapObjects[i];
	    			nearestTreeDistance = distanceToTree;
	    			print('Distance to the closest tree is: ' + nearestTreeDistance);
	    		}
	    	}
	    }
	    else
	    {
	    	
	    }
	    
	  }

}

/**
 * 
 */

function isTree(tree) {
  return tree == "alder" || tree == "appletree" || tree == "ash" || tree == "aspen" || tree == "baywillow" || tree == "beech" || tree == "birch" ||
  tree == "birdcherrytree" || tree == "buckthorn" || tree == "cedar" || tree == "cherry" || tree == "chestnuttree" || tree == "conkertree" || 
  tree == "corkoak" || tree == "crabappletree" || tree == "cypress" || tree == "elm" || tree == "fir" || tree == "goldenchain" || tree == "hazel" ||
  tree == "hornbeam" || tree == "juniper" || tree == "kingsoak" || tree == "larch" || tree == "laurel" || tree == "linden" || tree == "maple" ||
  tree == "mulberry" || tree == "oak" || tree == "olivetree" || tree == "peatree" || tree == "pine" || tree == "planetree" || tree == "plumtree" ||
  tree == "poplar" || tree == " rowan" || tree == "sallow" || tree == "spruce" || tree == "sweetgum" || tree == "walnuttree" || tree == "whitebeam" ||
  tree == "willow" || tree == "yew"; // etc
}

function isLog(log) {
	return log.name.endsWith('log');
}


/**
 * 
 */

var collectLogs = false;
var listOfLogs = new Array();
var listOfCollectedLogs = new Array();
var targetLog = null;
var hearthX = 0;
var hearthY = 0;

var logStockpileX = 0;
var logStockpileY = 0;

var holdingLog = false;



function collectingLogs()
{
	sleep(second*2);
	g.travelToHearthFire();
	sleep(second*1);
	g.waitForTaskToFinish();
	
	var playerCoords = g.getPlayerCoords();
	
	hearthX = playerCoords.x;
	hearthY = playerCoords.y;
	
	logStockpileX = playerCoords.x;
	logStockpileY = playerCoords.y+50;

	
	
	getAllLogsOnMap();
	
	while(areThereLogs())
		{
			targetLog = listOfLogs.pop();
			listOfLogs.push(targetLog);
			if(!holdingLog)
			print('Target log cords are: '+targetLog.coords.x + ', ' + targetLog.coords.y);
			if(holdingLog)
			print('Target Stockpile cords are: '+logStockpileX + ', ' + logStockpileY);
			sleep(second*5);
			if(getDistance()<toP)
			{
				print('Distance to target is: ' + getDistance())
				print('Has reached final destination!');
				if(holdingLog == false)
					{
						if(g.liftObject(targetLog.id))
						{
							print('Lifting log.')
							holdingLog = true;
							sleep(second*2);
							g.travelToHearthFire();
							sleep(second*1);
							g.waitForTaskToFinish();
							sleep(second*10);
							print('Now walking to stockpile!');
							hearthX = playerCoords.x;
							hearthY = playerCoords.y;
							walkToStart(logStockpileX + getRandomInt(-10,10), logStockpileY + getRandomInt(-10,10), 5);
						    g.mapRightClick(toX, toY);

						}
					}
				else if(holdingLog)
					{
					    print('Distance to target is: ' + getDistance())
						print('Is at stockpile!');
						walkToStart(logStockpileX + getRandomInt(-10,10), logStockpileY + getRandomInt(-10,10), 5);
						getDirection();
					    g.mapRightClick(playerCoords.x + xDirection*1, playerCoords.y + yDirection*1);
					    sleep(second*5);
					    listOfLogs.pop();
					    targetLog = null;
					    sleep(second*2);
						g.travelToHearthFire();
						sleep(second*1);
						g.waitForTaskToFinish();
						hearthX = playerCoords.x;
						hearthY = playerCoords.y;
						holdingLog = false;
					}
			}
			if(holdingLog == false && targetLog != null)
				{
					print('Walking to a log...');
					walkToStart(targetLog.coords.x + getRandomInt(-15,15), targetLog.coords.y + getRandomInt(-15,15), 5);
				}
			if(holdingLog && targetLog != null)
				{
					print('Walking to a stockpile...');
					walkToStart(logStockpileX + getRandomInt(-10,10), logStockpileY + getRandomInt(-10,10), 5);
					g.mapRightClick(logStockpileX, logStockpileY);
					if(isStuck())
						{
							getDirection();
							g.mapRightClick(playerCoords.x + xDirection*getRandomInt(20,40), playerCoords.y + yDirection*getRandomInt(20,40));
						}
				}
		    print('Distance to target is: ' + getDistance())

			
		}
}

function areThereLogs()
{
	if(listOfLogs.length == 0)
	{
		return false;
	}
	else
	{
		return true;
	}
}

function getAllLogsOnMap()
{
	var mapObjects = g.getAllMapObjects();
	
	for (var i = 0; i < mapObjects.length; ++i) 
	{
		var logObject = mapObjects[i];
		if(isLog(logObject))
		{
			listOfLogs.push(logObject);
		}	
	}
	
}

function findMoreLogs()
{
	
}
// * This is a test script that demonstrates some abilities of the Hafen's client scripting
//
// It does the following actions:
// - Logs in using provided login and password (replace them with the actual ones in `onLogin` function below)
// - Selects a specified character (replace it with the real one in `onCharSelect` function below)
// - Starts autowalking (with pathfinding)
// - When a forageable curio encountered, it picks it and place it in the study interface if it is a dandelion
// - When an aggresive animal or an unknown player encountered, it teleports to the hearth fire and starts autowalking again
//
// There are a lot more functions that you can use for the client scripting, please see the comments below
//
// * You should use a patched version of Amber client to make it work -- https://www.dropbox.com/s/srykok9g0uljfk6/amber-script.zip?dl=0
// Source code is available here -- https://github.com/b0r3d0m/amber ("feature/script-api" branch)
//
// * This script should be named "script.js" (w/o double quotes) and placed in the root directory of the modified Amber client (the same directory where you have the "hafen.jar" file)
//
// * It is written in Javascript but you can use Java standard library via `java` object (for example, `java.lang.Thread.sleep`)
//
// * Please read all NOTEs and comments
//
// * I'm strongly recommend not to use the game's client by yourself when there's "script.js" file in the game's directory
//   If you want to use the client by yourself, rename this script to something else and restart the client
//
// * Feel free to ask me any questions
//
// b0r3d0m

///////////////////////
// User-defined "global" variables
///////////////////////

/**
 * Game object from the {@link onGameLoaded} function
 * @type {Game}
 */
var g = null;

/**
 * A game second.
 */

var second = 1000;

var debug = false;


/**
 * ID of the autowalking timer
 * @type {Number}
 */
var autoWalkingTimerId = null;

///////////////////////
// API events
///////////////////////

// NOTE that you should define all API event functions, even if you don't want to handle some of them
//      Just do nothing if you don't want to process such events

/**
 * It is fired when the client started
 * @return {Object} options - Object that contains general options for the client
 * @return {Boolean} options.renderingEnabled - Set this option to `false` if you want to disable rendering
 */
function onClientStarted() {
  var options = {
    renderingEnabled: true
  };
  return options;
}

/**
 * It is fired when the login screen appeared
 * @return {Object} credentials - Object that contains information about login and password to log in with
 * @return {String} credentials.login - The actual login
 * @return {String} credentials.password - The actual password
 */
function onLogin() {
  print('Logging in...');

  var credentials = {
    login: user,
    password: pass
  };
  return credentials;
}

/**
 * It is fired 3 seconds after the character select. screen appeared
 * @return {String} characterName - Name of the character to select
 */
function onCharSelect() {
		print('Selecting character...');

  return character;
}

/** It is fired 10 seconds after the selected character entered the world
 * @param {Object} game This is the main interface to the client API, so generally you should keep a reference to it somewhere in the script
 */
function onGameLoaded(game) {

  print('Game loaded');

  g = game;

  onRedGameLoaded();
  onPorkGameLoaded();
  
}



// `game` interface:
// - getPlayerCoords()
//   Returns an object with the `x` and `y` properties represents the player's coordinates
//
// - getInvItems()
//   Returns an array of items' names from the character's inventory or `null` if there was an error
// 
// - studyCurio(curioName)
//   Places a curio with the specified name from the character's inventory to the study inventory
//   Returns `true` on success and `false` otherwise
//   NOTE that it doesn't handle situations when you don't have enough points to study the specified curio (it returns `true` in such cases)
//        Use function `getCharAttentionInfo` to check it
//
// - getCharAttentionInfo()
//   Returns an object with `max` and `used` properties 
// 
// - goTo(x, y)
//   Makes the character go to the specified coordinates (with the pathfinding enabled)
// 
// - pickItem(id)
//   Picks a foragable item with the specified id (with the pathfinding enabled)
//   Takes item's id
//   Returns `true` if there is an item with such id or `false` otherwise
// 
// - travelToHearthFire()
//   Makes the character travel to its hearth fire
//
// - getMapObjects(name)
//   Returns an array of map objects with the specified name (each of them has `name`, `fullName`, `id` and `coords` properties)
//
// - getMapObjectsByFullName(fullName)
//   The same as the `getMapObjects` function but looking for a fullName instead of name (for example, `gfx/terobjs/plants/carrot` instead of `carrot`) -- may be useful to distinguish between growing and laying objects
//
// - getAllMapObjects()
//   Returns an array of map objects (each of them has `name`, `fullName`, `id` and `coords` properties)
//
// - mapObjectRightClick(id)
//   Clicks an object with the specified ID via the right mouse button
//   NOTE That you can't use this function for some specific objects (for example, tables -- use `openTable` function instead)
//   Returns `true` on success or `false` otherwise
//
// - transferItem(name)
//   Transfers an item with the specified name from the character's inventory to an opened container (or study interface if there are no containers opened)
//   Returns `true` on success or `false` otherwise
//
// - transferItems(name)
//   The same as the `transferItem` function but transfers all objects wit the specified name
//   Returns `true` on success or `false` otherwise
//
// - getItemsFrom(windowName)
//   Returns an array of items' names from the specified window (for example, 'Frame' in case of drying frames) or `null` if there was an error
//
// - transferItemFrom(windowName, itemName)
//   Transfers an item with the specified name from the specified window to the character's inventory
//   Returns `true` on success or `false` otherwise
//
// - transferItemsFrom(windowName, itemsName)
//   The same as `transferItemFrom` function but transfers all objects with the specified name
//   Returns `true` on success or `false` otherwise
//
// - getHP()
//   Returns an object with `shp` and `hhp` properties represent the soft and hard hitpoints percents correspondingly (or -1 if there was an error)
//
// - getStamina()
//   Returns stamina of the player or -1 if there was an error
//
// - getEnergy()
//   Returns energy of the player / 100 or -1 if there was an error
//
// - drink()
//   Makes the character drink water from any of the following containers -- bucket, kuksa, waterskin and waterflask (from both character's inventory and equipment screen)
//   NOTE that this method, unlike many others, is synchronous
//        This is a result of its "adaptive" behavior -- it tries to drink from one container and if it's not enough it switches to the next one
//
// - eat(itemName)
//   Makes the character eat the specified item from its inventory
//   Returns `true` on success or `false` otherwise
//
// - eatFrom(windowName, itemName)
//   Makes the character eat the specified item from the specified window
//   Returns `true` on success or `false` otherwise
//
// - takeItemFromStockpile()
//   Takes item from an opened stockpile
//   Returns `true` on success or `false` otherwise
//
// - getStockpileInfo()
//   Returns an object that represents information about an opened stockpile (it has `resBaseName`, `used` and `total` properties) or `null` if there was an error
//
// - createStockpileWithItem(itemName, x, y)
//   Creates a stockpile with the specified item at (x, y) coordinates
//   Returns `true` on success or `false` otherwise
//   NOTE However, there are a lot of situations when this function can fail but still return `true` as a result
//        For example, createStockpileWithItem, unlike goTo and pickItem functions, doesn't use pathfinding (romovs didn't implement it yet)
//        The rule of thumb here is to wait for some time (this function, like many others, is asynchronous) and call the `getStockpileInfo` function to check whether we actually opened a stockpile menu
//
// - waitForPf()
//   Waits for pathfinding to finish
//
// - takeItem(itemName)
//   Takes an item from the character's inventory (it has the same effect as left-clicking an item)
//   It may be useful to call this function for map objects' interacting
//   Returns `true` on success or `false` otherwise
//
// - getEquippedItems()
//   Returns an array of items' names that equipped on the character or `null` if there was an error
//
// - equipItem(itemName)
//   Equips the specified item
//   Returns `true` on success or `false` otherwise
//
// - unequipItem(itemName)
//   Unequips the specified item (the item will be transferred to the character's inventory)
//   Returns `true` on success or `false` otherwise
//
// - sendAreaChatMessage(msg)
//   Sends the specified message to the area chat
//   Returns `true` on success or `false` otherwise
//
// - sendPartyChatMessage(msg)
//   Sends the specified message to the party chat
//   Returns `true` on success or `false` otherwise
//
// - sendVillageChatMessage(msg)
//   Sends the specified message to the village chat
//   Returns `true` on success or `false` otherwise
//
// - sendPrivateChatMessage(to, msg)
//   Sends the specified message to the player specified in the `to` parameter
//   Returns `true` on success or `false` otherwise
//
// - liftObject(id)
//   Makes the character to lift an object with the specified ID
//   Returns `true` on success or `false` otherwise
//
// - mapRightClick(x, y)
//   Right clicks the specified location
//   NOTE that this function, unlike several others, doesn't use pathfinder
//
// - getSpeed()
//   Returns speed of the character (0 <= speed <= 3 where 0 is "crawl" and 3 is "sprint") or -1 if there was an error
//
// - setSpeed(speed)
//   Sets speed of the character to the specified level (acceptable values -- 0 <= speed <= 3 where 0 is "crawl" and 3 is "sprint")
//
// - useMenuAction(hotkeys)
//   Activates menu action via the specified hotkeys (for example, `g.useMenuAction(['a', 'l'];` activates Adventure -> Lift action)
//   Returns `true` on success or `false` otherwise
//
// - craft(itemName)
//   Makes the character to craft the specified item
//   Returns `true` on success or `false` otherwise
//   NOTE that this function doesn't check that the character actually crafted the specified item
//
// - craftAll(itemName)
//   The same as the `craft` function but uses "Craft all" option instead of "Craft"
//
// - chooseFlowerMenuOption(option)
//   Chooses the specified flower menu option
//   Returns `true` on success or `false` otherwise
//
// - dropItem(itemName)
//   Makes the character to drop the specified item from its inventory
//   Returns `true` on success or `false` otherwise
//
// - dropItemFromHand()
//   Makes the character to drop an item from its hand
//   Returns `true` on success or `false` otherwise
//
// - useItemFromHandOnObject(id)
//   Makes the character to use an item from its hand on an object with the specified ID
//   Returns `true` on success or `false` otherwise
//
// - getBarrelContent(id)
//   Returns a type of the barrel's content ('water', 'milk', 'honey' etc) or 'empty' if it's empty. Returns null if there was an error
//
// - getBarrelLiters(id)
//   Returns amount of liquid inside a barrel with the specified ID or null if there was an error
//   NOTE that this function right-clicks the barrel and waits 5 seconds for the "Barrel" window to appear
//
// - getGrowthStage(id)
//   Returns growth stage of a plant with the specified ID or -1 if there was an error
//
// - getHighlightedMapObjects()
//   Returns an array of highlighted map objects (each of them has `name`, `fullName`, `id` and `coords` properties)
//
// - waitForTaskToFinish()
//   Waits for the current task to finish (until hourglass is gone)
//
// - useItemFromHandOnCoords(x, y)
//   Uses an item from hand on the specified coords (you can take it to your hand via `takeItem` function)
//   Returns `true` on success or `false` otherwise
//
// - dropItemFromHandToWindow(windowName)
//   Drops an item from hand to the specified window (useful when having a butcket in your hands)
//   Returns `true` on success or `false` otherwise
//
// - takeItemFromWindow(windowName, itemName)
//   The same as the `takeItem` function but takes an item from the specified window
//   Returns `true` on success or `false` otherwise
//
// - feastEat(itemName)
//   Clicks a "Feast" button and then eats the specified item (NOTE that you should open a table before using this function via the `openTable` function, see below)
//   Returns `true` on success or `false` otherwise
//
// - openTable(id)
//   Opens a table with the specified ID
//   Returns `true` on success or `false` otherwise
//
// - getCharInvSize()
//   Returns an object with the `width` and `height` properties set to the appropriate cells count or null if there was an error
//
// - getCharInvCellsUsageMatrix()
//   Returns a 2D array with 0 and 1 values representing free and used cells correspondingly or null if there was an error
//   You can access specific cell via the Cartesian coordinate system syntax where (0, 0) is the top-left cell
//
// - getFreeCharInvCellsCount()
//   Returns a count of free cells in the character's inventory or -1 if there was an error
//
// - getFuelLevel(id, windowName)
//   Returns fuel level of an object with the specified ID or null if there was an error
//   NOTE that this function right-clicks the object and waits several seconds for the corresponding window to appear
//
// - getWaterLevel(id, windowName)
//   Returns water level of an object with the specified ID or null if there was an error
//   NOTE that this function right-clicks the object and waits several seconds for the corresponding window to appear
//
// - logout()
//   Logs out from the current account
// 
// - quit()
//   Closes game's window
//   NOTE that in most situations it's better to call the `logout` function instead of this one
//        because the `logout` sends a direct message about your willings to the game's server while the `quit` function
//        just simply calls `System.exit(0)` that can lead to the more "delayed" logout

// NOTE that any events except `onLogin` and `onCharSelect` can be fired **before** `onGameLoaded`
// NOTE that the majority of API functions are asynchronous -- including but not limited to `goTo`, `pickItem`, `travelToHearthFire` and `logout`
//      Synrhonous ones include `getInvItems` and `quit`
// NOTE that you should NOT use the === operator when the API objects take place in comparisons, use == operator instead
// NOTE that any functions that work with items' names expect an item's base resource name
//      So instead of 'Dried Fox Hide' you should pass 'foxhide', instead of 'Raw Fox Hide' you should pass 'foxhide-blood' etc

/** It is fired when a foragable curio was found (once for each of them)
 * @param {Number} id ID of the curio
 * @param {String} name Name of the curio
 * @param {Object} coords Coordinates of the curio
 * @param {Number} coords.x x coordinate of the curio
 * @param {Number} coords.y y coordinate of the curio
 */
function onCurioFound(id, name, coords) {
	onRedCurioFound(id, name, coords);
	onPorkCurioFound(id, name, coords);
}

/** It is fired when a creature was encountered (once for each of them)
 * @param {Number} id ID of the creature 
 * @param {String} name Name of the creature
 * @param {Object} coords Coordinates of the creature
 * @param {Number} coords.x x coordinate of the creature
 * @param {Number} coords.y y coordinate of the creature
 */
function onCreatureFound(id, name, coords) {
	onRedCreatureFound(id, name, coords);
	onPorkCreatureFound(id, name, coords);
  if (g == null) {
    return;
  }

  if (isAggr(name)) {
    print('Creature "' + name + '" encountered, trying to travel to the hearth fire...');

    stopAutoWalking();
    g.travelToHearthFire();

    setTimeout(function() {
      print('Resuming autowalking...');
      startAutoWalking();
    }, second*10);
  }
}

/** It is fired when another player was encountered (once for each of them)
 * @param {Number} id ID of the player
 * @param {Boolean} isKin Indicates whether the player is in the kin list or not
 * @param {Object} coords Coordinates of the player
 * @param {Number} coords.x x coordinate of the creature
 * @param {Number} coords.y y coordinate of the creature
 */
function onPlayerFound(id, isKin, coords) {
	onRedPlayerFound(id, isKin, coords);
	onPorkPlayerFound(id, isKin, coords);
  if (g == null) {
    return;
  }

  if (!isKin) {
    print('Non-kin player encountered, trying to travel to the hearth fire...');

    stopAutoWalking();
    g.travelToHearthFire();

    setTimeout(function() {
      print('Resuming autowalking...');
      startAutoWalking();
    }, second*10);
  }
}

/** It is fired when the flower menu appears (the one that opens after right clicking an object)
 * @param {Array} options Available flower menu options
 */
function onFlowerMenuOpen(options) {
	onRedFlowerMenuOpen(options);
	onPorkFlowerMenuOpen(options);
  // ignored
}

/** It is fired when the user enters a command in the console window
 * @param {String} input User command
 */
function onUserInput(input) {
	onRedUserInput(input);
	onPorkUserInput(input);
  // ignored
}

/** It is fired when a chat message received from another player
 * @param {String} chat Chat name
 * @param {String} from Sender's name (or '???' if it's unknown)
 * @param {String} msg Message
 */
function onChatMessage(chat, from, msg) {
	onRedChatMessage(chat, from, msg);
	onPorkChatMessage(chat, from, msg);
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
function onMapObjectHighlight(obj) {
	onRedMapObjectHighlight(obj);
	onPorkMapObjectHighlight(obj);
  // ignored
}

///////////////////////
// User-defined functions
///////////////////////

/** Starts autowalking timer that will move character x+50, y+50 every second */
function startAutoWalking() {
	startRedAutoWalking();
	startPorkAutoWalking();
}

/** Stops autowalking timer */
function stopAutoWalking() {
  stopRedAutoWalking();
  stopPorkAutoWalking();
}

/** Determines whether the specified animal is aggresive (NOTE that this function is incomplete)
 * @param {String} animal Name of the animal to check
 * @return {Boolean} true if the specified animal is aggressive or false otherwise
 */
function isAggr(animal) {
	if(agroToggle)
		return animal == "badger" || animal == "lynx" || animal == "bat" || animal == "bear" || animal == "boar" || isRedAggr(animal) || isPorkAggr(animal); // etc
	else
		return false;
}

/** Returns a mental weight of the specified curio (NOTE that this function is incomplete)
 * @param {String} curioName Name of the curio
 * @return {Number} Mental weight of the specified curio
 */
function getMentalWeight(curioName) {
	getRedMentalWeight(curioName);
	getPorkMentalWeight(curioName);
  var mws = {
    'dandelion': 1
    // etc
  };
  return mws[curioName];
}

/** Prints the specified message to stdout
 * @param {String} msg Message to print
 */
function print(msg) {
  java.lang.System.out.println(msg);
}

/**
 * Sleeps for the specified amount of milliseconds <br>
 * NOTE that this function should be used carefully <br>
 *      It prevents the event loop from triggering new actions until you finally return from the API event function <br>
 *      If possible, use `setTimeout` and `setInterval` functions instead <br>
 * @param {Number} millisecs Amount of milliseconds to sleep for
 */
function sleep(millisecs) {
  java.lang.Thread.sleep(millisecs);
}

///////////////////////
// Helper functions to work with timeouts and intervals
///////////////////////

var setTimeout,
    clearTimeout,
    setInterval,
    clearInterval;

(function () {
    var timer = new java.util.Timer();
    var counter = 1; 
    var ids = {};

    setTimeout = function(fn, delay) {
        var id = counter++;
        ids[id] = new JavaAdapter(java.util.TimerTask, {run: fn});
        timer.schedule(ids[id], delay);
        return id;
    };

    clearTimeout = function(id) {
        timer.purge();
        delete ids[id];
    };

    setInterval = function(fn, delay) {
        var id = counter++; 
        ids[id] = new JavaAdapter(java.util.TimerTask, {run: fn});
        timer.schedule(ids[id], delay, delay);
        return id;
    };

    clearInterval = clearTimeout;

})();


/**
 * 
 */
 var RedAutoWalkingSwitch = true;
 
 var RedWalkDefault = false;
 var agroToggle = false;
 
 var WalkToSwitch = false;
 
var isStuckCooldown = 0;
 
var directionCount = 0;

var xDirection = 0;
var yDirection = 0;

var oldPlayerX = 0;
var oldPlayerY = 0;

var toX = 0;
var toY = 0;
var toP = 0;

function gameStart()
{
	if(debug){
		print('Travel to hearth fire...');
		g.travelToHearthFire();
		if(debug)
			print('Sleep 10 seconds...');
		sleep(second*10);
	}
  print('Starting autowalking...');
  startAutoWalking();
}

function walk()
{
	if(RedWalkDefault)
		{
			defaultWalk();
		}
	else if(WalkToSwitch)
	{
		walkTo();
	}
	else
	{
		
	}
}

function walkTo()
{
	g.goTo(toX, toY);
	var playerCoords = g.getPlayerCoords();
	if(isStuck())
		{
			print('Is stuck! Fixing itself.');
			RedWalkDefault = true;
			sleep(second*5);
			RedWalkDefault = false;
			print('Try walking again.');
		}
	if(getDistance()<toP)
		{
			WalkToSwitch = false;
		}
}

function walkToStart(x, y, precision)
{
	toX = x;
	toY = y;
	toP = precision;
	WalkToSwitch = true;
	walkTo();
}

function walkToToggle()
{
	if(WalkToSwitch)
		{
		print('Walking to target has stopped...');
		WalkToSwitch = false;
		}
	else
		{
		print('Walking to target has resumed...');
		WalkToSwitch = true;
		}
}

function walkDefaultToggle()
{
	if(RedWalkDefault)
		{
		print('Red Walking has stopped...');
		RedWalkDefault = false;
		}
	else
		{
		print('Red Walking has resumed...');
		RedWalkDefault = true;
		}
}

function walkAutoToggle()
{
	if(RedAutoWalkingSwitch)
		{
		print('Red Auto Walking has stopped...');
		RedAutoWalkingSwitch = false;
		}
	else
		{
		print('Red Auto Walking has resumed...');
		RedAutoWalkingSwitch = true;
		}
}

function chopperToggle()
{
	if(choppingTrees)
		{
		print('Chopping has stopped...');
		choppingTrees = false;
		}
	else
		{
		print('Chopping has resumed...');
		choppingTrees = true;
		chopWood();
		}
}

function agroToggleSwitch()
{
	if(agroToggle)
		{
			print('Agro Homing has stopped...');
			agroToggle = false;
		}
	else
		{
			print('Agro Homing has resumed...');
			agroToggle = true;
		}
}

function logCollectToggle()
{
	if(collectLogs)
		{
		print('Log Collecting has stopped...');
		collectLogs = false;
		WalkToSwitch = false;
		}
	else
		{
		print('Log Collecting has resumed...');
		collectLogs = true;
		collectingLogs();
		}
}

function defaultWalk()
{
		direction();
		var playerCoords = g.getPlayerCoords();
		g.goTo(playerCoords.x + xDirection*getRandomInt(0,200), yDirection*playerCoords.y + getRandomInt(0,200));
		if(debug)
		print('Decrease the step count...');
		directionCount = directionCount - 1;
		if(debug)
		print('Sleep on walk...');
}

function direction()
{
	if(debug)
	print('Check if there is a direction step count or if the player is stuck...');
	if(directionCount <= 0 || isStuck())
		{
		if(debug)
			print('There was not a count, pick a new one...');
			directionCount = getDirectionCount(20);
			if(debug)
			print('The direction count is now ' + directionCount + '.');
			
			xDirection = getDirection();
			if(debug)
			print('The x direction is now ' + xDirection + '.');
			yDirection = getDirection();
			if(debug)
			print('The y direction is now ' + yDirection + '.');
		}
}

function isStuck()
{
	var playerCoords = g.getPlayerCoords();
	if(oldPlayerX == playerCoords.x && oldPlayerY == playerCoords.y)
	{
		if(isStuckCooldown <= 0 || (!collectLogs && !choppingTrees))
			{
				if(debug)
					print('Player is stuck!');
				oldPlayerX = 0;
				oldPlayerY = 0;
				isStuckCooldown = 5;
				return true;
			}
		else
			{
				isStuckCooldown--;
				return false;
			}
		
	}
	else
	{
		oldPlayerX = playerCoords.x;
		oldPlayerY = playerCoords.y;
		return false;
	}
}

/** Gets a random integer between min an max. */
function getRandomInt(min, max) 
{
	  return Math.random() * (max - min) + min;
}

/** Gets a random integer between min an max. */
function getDirection() 
{
	var c = Math.random() * (1 - -1) + -1;
	c = c.toFixed(0);
	if(c == 0)
		{
			return getDirection();
		}
		
	  return c;
}

function getDistance(objectOne, ObjectTwo) {
	  var dx = objectOne.x - ObjectTwo.x;
	  var dy = objectOne.y - ObjectTwo.y;
	  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
	}

function getDistance(objectOne) {
	  var dx = objectOne.x - toX;
	  var dy = objectOne.y - toY;
	  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
	}

function getDistance() {
	var playerCoords = g.getPlayerCoords();
	  var dx = playerCoords.x - toX;
	  var dy = playerCoords.y - toY;
	  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
	}

/** Gets a random direction count between min an max.
 * @param min
 * @param max
 * @returns
 */
function getDirectionCount(max)
{
	return getRandomInt(0, max).toFixed(0);
}

var lookForCurious = false;
var worldCheckerId = null;
var checkedBoughTrees = [];
var checkedBranchTrees = [];
var fullStockpiles = [];
var finishedTask = false;
var boughWorking = false;
var branchWorking = false;
var pickBoughs = false;
var pickBranches = false;
var previousLocation = null;
var storedPlayerX = 0;
var storedPlayerY = 0;

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
	
	if(pickBoughs){
	
	var foundBough = false;
	
	for(var i = 0; i < options.length; i++) {
		
		if(options[i] == 'Take bough') {
			
			g.chooseFlowerMenuOption('Take bough');
			
			sleep(second*10);
			
			foundBough = true;
			
			finishedTask = true;
			
		}
		
	}
	
	if(!foundBough) {
		
		g.mapRightClick(g.getPlayerCoords().x, g.getPlayerCoords().y);
		
		g.chooseFlowerMenuOption(options[0]);
		
		g.goTo(g.getPlayerCoords().x + 1, g.getPlayerCoords().y + 1);
		
		finishedTask = true;
		
	}
	
	}
	else if(pickBranches){
		
		var foundBranch = false;
		
		for(var i = 0; i < options.length; i++) {
			
			if(options[i] == 'Take branch') {
				
				g.chooseFlowerMenuOption('Take branch');
				
				sleep(second*10);
				
				foundBranch = true;
				
				finishedTask = true;
				
			}
			
		}
		
		if(!foundBranch) {
			
			g.mapRightClick(g.getPlayerCoords().x, g.getPlayerCoords().y);
			
			g.chooseFlowerMenuOption(options[0]);
			
			g.goTo(g.getPlayerCoords().x + 1, g.getPlayerCoords().y + 1);
			
			finishedTask = true;
			
		}
		
		}
	
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
	else if(input == 'pickboughs') {
		if(pickBoughs) {
			pickBoughs = false;
			print('Bough Picking: Disabled');
		}
		else
		{
			pickBoughs = true;
			print('Bough Picking: Enabled');
		}
	}
	else if(input == 'pickbranches') {
		if(pickBranches) {
			pickBranches = false;
			print('Branch Picking: Disabled');
		}
		else
		{
			pickBranches = true;
			print('Branch Picking: Enabled');
		}
	}
	else if(input == 'print inventory') {
		
		var inv = g.getInvItems();
		
		for(var index = 0; index < inv.length; index++) {
			
			print(inv[index]);
			
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
		if(g != null && !boughWorking) {
			pickBoughScript();
		}
		if(g != null && !branchWorking) {
			pickBranchScript();
		}
	}, second * 10);
	
}

function pickBoughScript() {
	
	if(pickBoughs) {
	
	boughWorking = true;
	
	var checked = ["alder", "appletree", "ash", "aspen", "baywillow", "beech", 
	               "birch", "birdcherrytree" ,"buckthorn" ,"cedar" ,"cherry" ,"chestnuttree",
	               "conkertree", "corkoak", "crabappletree", "cypress", "elm", "fir", "goldenchain", "hazel",
	               "hornbeam" ,"juniper" ,"kingsoak" ,"larch" ,"laurel" ,"linden" ,"maple",
	               "mulberry" ,"oak" ,"olivetree" ,"peatree" ,"pine" ,"planetree" ,"plumtree",
	               "poplar" ," rowan" ,"sallow" ,"spruce" ,"sweetgum" ,"walnuttree" ,"whitebeam",
	               "willow" ,"yew"];
	
	for(var i = 0; i < checked.length; i++) {
	
	var mapObjects = g.getMapObjects(checked[i]);
	
	print('Checking for ' + checked[i]);
	
	for(var index = 0; index < mapObjects.length ; index++) {
		
		if(pickBoughs) {
		
		var map = mapObjects[index];
		
		// - getMapObjects(name)
		//   Returns an array of map objects with the specified name (each of them has `name`, `fullName`, `id` and `coords` properties)
		
		var found = true;
		
		var invNotFull = true;
		
		if(g.getFreeCharInvCellsCount() >= 14) {
			
		}
		else
		{
			invNotFull = false;
		}
		
		if(invNotFull) {
		
		for(var x = 0; checkedBoughTrees.length < x; x++) {
						
			if(checkedBoughTrees[x] == map.id) {
				
				found = false;
				
			}
			
		}
		
		if(found) {
			
			print('Found appropriate match.');
			
			// - mapObjectRightClick(id)
			//   Clicks an object with the specified ID via the right mouse button
			//   NOTE That you can't use this function for some specific objects (for example, tables -- use `openTable` function instead)
			//   Returns `true` on success or `false` otherwise
			
			var xBackup = map.coords.x;
			
			var yBackup = map.coords.y;
			
			var randomChangeX = getRandomInt(-10,10);
			
			var randomChangeY = getRandomInt(-10,10);
			
			var timesStuck = 0;
			
			var totalTimesStuck = 0;
			
			while(g.getPlayerCoords().x != xBackup + randomChangeX && g.getPlayerCoords().y != yBackup + randomChangeY) {
				
				if((g.getPlayerCoords().x - (xBackup + randomChangeX)) < 5 && (g.getPlayerCoords().x - (xBackup + randomChangeX)) > -5 && (g.getPlayerCoords().y - (yBackup + randomChangeY)) < 5 && (g.getPlayerCoords().y - (yBackup + randomChangeY)) > -5) {
					
					break;
					
				}
				
				if(!isPorkStuck()) {
					
				timesStuck = 0;
				
				g.goTo(xBackup + randomChangeX, yBackup + randomChangeY);
				
				print('Going');
				
				}
				else
				{
				
				timesStuck++;
				
				totalTimesStuck++;
				
				if(totalTimesStuck > 20) {
					
					print('Stuck too many times... Skipping.');
					
					print(map.name + ' with id of ' + map.id + ' was skipped, as it could not be pathed to.');
					
					finishedTask = true;
					
					break;
					
				}
				
				print('Stuck');
				
				if(timesStuck < 4) {
					
					randomChangeX = getRandomInt(-15,15);
					
					randomChangeY = getRandomInt(-15,15);
					
					g.goTo(xBackup + randomChangeX, yBackup + randomChangeY);
					
					if(g.getPlayerCoords().x == xBackup + randomChangeX && g.getPlayerCoords().y == yBackup + randomChangeY) {
						
						break;
						
					}
					
				}
				else
				{
					
					randomChangeX = getRandomInt(-25,25);
					
					randomChangeY = getRandomInt(-25,25);
					
					g.goTo(g.getPlayerCoords().x + randomChangeX, g.getPlayerCoords().y + randomChangeY);
					
					randomChangeX = getRandomInt(-15,15);
					
					randomChangeY = getRandomInt(-15,15);
					
				}
				
				}
			
				sleep(second * 1);
				
			}
			
			g.mapRightClick(g.getPlayerCoords().x, g.getPlayerCoords().y);
			
			print('Found tree');
			
			sleep(second);
			
			g.mapObjectRightClick(map.id);
			
			var timesWaited = 0;
			
			while(!finishedTask) {
				
				print('Waiting');
				
				timesWaited++;
				
				if(timesWaited > 20) {
					
					break;
					
				}
				else
				{
				
				sleep(second);
				
				}
				
			}
			
			finishedTask = false;
			
			print('Finished');
			
			g.goTo(g.getPlayerCoords().x,g.getPlayerCoords().y);
			
			checkedBoughTrees[checkedBoughTrees.length] = map.id;
			
		}
		
		}
		else
		{
			
			print('Inventory needs emptying');
			
			previousCoords = g.getPlayerCoords();
			
			g.travelToHearthFire();
			
			sleep(second*7);
			
			index--;
			
			index = Math.max(0, index);
			
			g.goTo(g.getPlayerCoords().x,g.getPlayerCoords().y);
			
			sleep(1000);
			
			var stockpiles = g.getMapObjects('stockpile-bough');
			
			print('Checking for stockpile-bough');
			
			for(var ind = 0; ind < stockpiles.length ; ind++) {
				
				var stockpile = stockpiles[ind];
				
				var stockFound = true;
				
				for(var full = 0; full < fullStockpiles.length; full++) {
					
					if(fullStockpiles[i] == stockpile.id) {
						
						stockFound = false;
						
					}
					
				}
				
				if(stockFound) {
					
					var xBackups = stockpile.coords.x;
					
					var yBackups = stockpile.coords.y;
					
					var randomChangeXs = getRandomInt(-20,20);
					
					var randomChangeYs = getRandomInt(-20,20);
					
					var timesStucks = 0;
					
					var totalTimesStucks = 0;
					
					while(g.getPlayerCoords().x != xBackups + randomChangeXs && g.getPlayerCoords().y != yBackups + randomChangeYs) {
						
						if((g.getPlayerCoords().x - (xBackups + randomChangeXs)) < 5 && (g.getPlayerCoords().x - (xBackups + randomChangeXs)) > -5 && (g.getPlayerCoords().y - (yBackups + randomChangeYs)) < 5 && (g.getPlayerCoords().y - (yBackups + randomChangeYs)) > -5) {
							
							break;
							
						}
						
						if(!isPorkStuck()) {
							
						timesStucks = 0;
						
						g.goTo(xBackups + randomChangeXs, yBackups + randomChangeYs);
						
						print('Going to stockpile');
						
						}
						else
						{
						
						timesStucks++;
						
						totalTimesStucks++;
						
						if(totalTimesStucks > 30) {
							
							print('Stuck too many times... Skipping.');
							
							break;
							
						}
						
						print('Stuck');
						
						if(timesStucks < 4) {
							
							randomChangeXs = getRandomInt(-20,20);
							
							randomChangeYs = getRandomInt(-20,20);
							
							g.goTo(xBackups + randomChangeXs, yBackups + randomChangeYs);
							
							if(g.getPlayerCoords().x == xBackups + randomChangeXs && g.getPlayerCoords().y == yBackups + randomChangeYs) {
								
								break;
								
							}
							
						}
						else
						{
							
							randomChangeXs = getRandomInt(-25,25);
							
							randomChangeYs = getRandomInt(-25,25);
							
							g.goTo(g.getPlayerCoords().x + randomChangeXs, g.getPlayerCoords().y + randomChangeYs);
							
							randomChangeXs = getRandomInt(-20,20);
							
							randomChangeYs = getRandomInt(-20,20);
							
						}
						
						}
					
						sleep(second * 1);
						
					}
					
					g.mapRightClick(g.getPlayerCoords().x, g.getPlayerCoords().y);
					
					print('Found stockpile.');
					
					sleep(second);
					
					g.mapObjectRightClick(stockpile.id);
					
					sleep(second*5);
					
					var stockpileInfo = g.getStockpileInfo();
					
					if(stockpileInfo != null) {
						
						print('Unloading inventory');
						
						var items = g.getInvItems();
						
						var total = stockpileInfo.total;
						
						var used = stockpileInfo.used;
						
						for(var z = 0; z < items.length; z++) {
							
							for(var boughCheck = 0; boughCheck < checked.length; boughCheck++) {
								
								if(items[z] == ('bough-' + checked[boughCheck])) {
									
									if(used < total) {
										
										sleep(second);
										
										g.takeItem(items[z]);
										
										sleep(second);
										
										g.useItemFromHandOnObject(stockpile.id);
										
										sleep(second * 0.5);
										
										used++;
										
									}
									else
									{
										
										fullStockpiles[fullStockpiles.length] = stockpile.id;
										
									}
									
									break;
									
								}
								
							}
							
						}
						
					}
					else
					{
						
						var timesTried = 0;
						
						var success = false;
						
						while(timesTried < 10) {
							
							timesTried++;
							
							g.mapObjectRightClick(stockpile.id);
							
							sleep(second);
							
							if(g.getStockpileInfo() != null) {
								
								success = true;
								
							}
							
						}
						
						if(success) {
							
							stockpileInfo = g.getStockpileInfo();
							
							print('Unloading inventory');
							
							var items = g.getInvItems();
							
							var total = stockpileInfo.total;
							
							var used = stockpileInfo.used;
							
							for(var z = 0; z < items.length; z++) {
								
								for(var boughCheck = 0; boughCheck < checked.length; boughCheck++) {
									
									if(items[z] == ('bough-' + checked[boughCheck])) {
										
										if(used < total) {
											
											sleep(second);
											
											g.takeItem(items[z]);
											
											sleep(second);
											
											g.useItemFromHandOnObject(stockpile.id);
											
											sleep(second * 0.5);
											
											used++;
											
										}
										else
										{
											
											fullStockpiles[fullStockpiles.length] = stockpile.id;
											
										}
										
										break;
										
									}
									
								}
								
							}
							
						}
						
					}
					
					print('Finished with stockpile');
					
				}
				
			}
			
			if(g.getFreeCharInvCellsCount() >= 16) {
				
				boughWorking = false;

			}
			else
			{
				invNotFull = false;
				
				boughWorking = false;
				
				pickBoughs = false;

			}
			
			while(g.getPlayerCoords().x != previousCoords.x && g.getPlayerCoords().y != previousCoords.y) {
				
				var randomChangeXss = getRandomInt(-10,10);
				
				var randomChangeYss = getRandomInt(-10,10);
				
				var timesStuckz = 0;
				
				var totalTimesStuckz = 0;
				
				if(!isPorkStuck()) {
					
					timesStuckz = 0;
					
					g.goTo(previousCoords.x + randomChangeXss, previousCoords.y  + randomChangeYss);
					
					print('Going to previous location');
					
					}
					else
					{
					
					timesStuckz++;
					
					totalTimesStuckz++;
					
					if(totalTimesStuckz > 50) {
						
						print('Stuck too many times... Skipping.');
						
						break;
						
					}
					
					print('Stuck');
					
					if(timesStuckz < 4) {
						
						randomChangeXss = getRandomInt(-20,20);
						
						randomChangeYss = getRandomInt(-20,20);
						
						g.goTo(previousCoords.x + randomChangeXss, previousCoords.y + randomChangeYss);
						
						if(g.getPlayerCoords().x == previousCoords.x + randomChangeXss && g.getPlayerCoords().y == previousCoords.y + randomChangeYss) {
							
							break;
							
						}
						
					}
					else
					{
						
						randomChangeXs = getRandomInt(-25,25);
						
						randomChangeYs = getRandomInt(-25,25);
						
						g.goTo(g.getPlayerCoords().x + randomChangeXs, g.getPlayerCoords().y + randomChangeYs);
						
						randomChangeXs = getRandomInt(-20,20);
						
						randomChangeYs = getRandomInt(-20,20);
						
					}
					
					}
				
					sleep(second * 1);
				
			}
							
		}
		
		}
		else
		{
			
			boughWorking = false;
			
		}
		
	}
	
	}
	
	boughWorking = false;
	
	pickBoughs = false;
	
	}
	else
	{
		boughWorking = false;
		
		pickBoughs = false;
		
	}
	
}

function pickBranchScript() {
	
	if(pickBranches) {
	
	branchWorking = true;
	
	var checked = ["alder", "appletree", "ash", "aspen", "baywillow", "beech", 
	               "birch", "birdcherrytree" ,"buckthorn" ,"cedar" ,"cherry" ,"chestnuttree",
	               "conkertree", "corkoak", "crabappletree", "cypress", "elm", "fir", "goldenchain", "hazel",
	               "hornbeam" ,"juniper" ,"kingsoak" ,"larch" ,"laurel" ,"linden" ,"maple",
	               "mulberry" ,"oak" ,"olivetree" ,"peatree" ,"pine" ,"planetree" ,"plumtree",
	               "poplar" ," rowan" ,"sallow" ,"spruce" ,"sweetgum" ,"walnuttree" ,"whitebeam",
	               "willow" ,"yew"];
	
	for(var i = 0; i < checked.length; i++) {
	
	var mapObjects = g.getMapObjects(checked[i]);
	
	print('Checking for ' + checked[i]);
	
	for(var index = 0; index < mapObjects.length ; index++) {
		
		if(pickBranches) {
		
		var map = mapObjects[index];
		
		// - getMapObjects(name)
		//   Returns an array of map objects with the specified name (each of them has `name`, `fullName`, `id` and `coords` properties)
		
		var found = true;
		
		var invNotFull = true;
		
		if(g.getFreeCharInvCellsCount() >= 16) {
			
		}
		else
		{
			invNotFull = false;
		}
		
		if(invNotFull) {
		
		for(var x = 0; checkedBranchTrees.length < x; x++) {
						
			if(checkedBranchTrees[x] == map.id) {
				
				found = false;
				
			}
			
		}
		
		if(found) {
			
			print('Found appropriate match.');
			
			// - mapObjectRightClick(id)
			//   Clicks an object with the specified ID via the right mouse button
			//   NOTE That you can't use this function for some specific objects (for example, tables -- use `openTable` function instead)
			//   Returns `true` on success or `false` otherwise
			
			var xBackup = map.coords.x;
			
			var yBackup = map.coords.y;
			
			var randomChangeX = getRandomInt(-10,10);
			
			var randomChangeY = getRandomInt(-10,10);
			
			var timesStuck = 0;
			
			var totalTimesStuck = 0;
			
			while(g.getPlayerCoords().x != xBackup + randomChangeX && g.getPlayerCoords().y != yBackup + randomChangeY) {
				
				if((g.getPlayerCoords().x - (xBackup + randomChangeX)) < 5 && (g.getPlayerCoords().x - (xBackup + randomChangeX)) > -5 && (g.getPlayerCoords().y - (yBackup + randomChangeY)) < 5 && (g.getPlayerCoords().y - (yBackup + randomChangeY)) > -5) {
					
					break;
					
				}
				
				if(!isPorkStuck()) {
					
				timesStuck = 0;
				
				g.goTo(xBackup + randomChangeX, yBackup + randomChangeY);
				
				print('Going');
				
				}
				else
				{
				
				timesStuck++;
				
				totalTimesStuck++;
				
				if(totalTimesStuck > 20) {
					
					print('Stuck too many times... Skipping.');
					
					print(map.name + ' with id of ' + map.id + ' was skipped, as it could not be pathed to.');
					
					finishedTask = true;
					
					break;
					
				}
				
				print('Stuck');
				
				if(timesStuck < 4) {
					
					randomChangeX = getRandomInt(-15,15);
					
					randomChangeY = getRandomInt(-15,15);
					
					g.goTo(xBackup + randomChangeX, yBackup + randomChangeY);
					
					if(g.getPlayerCoords().x == xBackup + randomChangeX && g.getPlayerCoords().y == yBackup + randomChangeY) {
						
						break;
						
					}
					
				}
				else
				{
					
					randomChangeX = getRandomInt(-25,25);
					
					randomChangeY = getRandomInt(-25,25);
					
					g.goTo(g.getPlayerCoords().x + randomChangeX, g.getPlayerCoords().y + randomChangeY);
					
					randomChangeX = getRandomInt(-15,15);
					
					randomChangeY = getRandomInt(-15,15);
					
				}
				
				}
			
				sleep(second * 1);
				
			}
			
			g.mapRightClick(g.getPlayerCoords().x, g.getPlayerCoords().y);
			
			print('Found tree');
			
			sleep(second);
			
			g.mapObjectRightClick(map.id);
			
			var timesWaited = 0;
			
			while(!finishedTask) {
				
				print('Waiting');
				
				timesWaited++;
				
				if(timesWaited > 20) {
					
					break;
					
				}
				else
				{
				
				sleep(second);
				
				}
				
			}
			
			finishedTask = false;
			
			print('Finished');
			
			g.goTo(g.getPlayerCoords().x,g.getPlayerCoords().y);
			
			checkedBranchTrees[checkedBranchTrees.length] = map.id;
			
		}
		
		}
		else
		{
			
			print('Inventory needs emptying');
			
			previousCoords = g.getPlayerCoords();
			
			g.travelToHearthFire();
			
			sleep(second*7);
			
			index--;
			
			index = Math.max(0, index);
			
			g.goTo(g.getPlayerCoords().x,g.getPlayerCoords().y);
			
			sleep(1000);
			
			var stockpiles = g.getMapObjects('stockpile-branch');
			
			print('Checking for stockpile-branch');
			
			for(var ind = 0; ind < stockpiles.length ; ind++) {
				
				var stockpile = stockpiles[ind];
				
				var stockFound = true;
				
				for(var full = 0; full < fullStockpiles.length; full++) {
					
					if(fullStockpiles[i] == stockpile.id) {
						
						stockFound = false;
						
					}
					
				}
				
				if(stockFound) {
					
					var xBackups = stockpile.coords.x;
					
					var yBackups = stockpile.coords.y;
					
					var randomChangeXs = getRandomInt(-20,20);
					
					var randomChangeYs = getRandomInt(-20,20);
					
					var timesStucks = 0;
					
					var totalTimesStucks = 0;
					
					while(g.getPlayerCoords().x != xBackups + randomChangeXs && g.getPlayerCoords().y != yBackups + randomChangeYs) {
						
						if((g.getPlayerCoords().x - (xBackups + randomChangeXs)) < 5 && (g.getPlayerCoords().x - (xBackups + randomChangeXs)) > -5 && (g.getPlayerCoords().y - (yBackups + randomChangeYs)) < 5 && (g.getPlayerCoords().y - (yBackups + randomChangeYs)) > -5) {
							
							break;
							
						}
						
						if(!isPorkStuck()) {
							
						timesStucks = 0;
						
						g.goTo(xBackups + randomChangeXs, yBackups + randomChangeYs);
						
						print('Going to stockpile');
						
						}
						else
						{
						
						timesStucks++;
						
						totalTimesStucks++;
						
						if(totalTimesStucks > 30) {
							
							print('Stuck too many times... Skipping.');
							
							break;
							
						}
						
						print('Stuck');
						
						if(timesStucks < 4) {
							
							randomChangeXs = getRandomInt(-20,20);
							
							randomChangeYs = getRandomInt(-20,20);
							
							g.goTo(xBackups + randomChangeXs, yBackups + randomChangeYs);
							
							if(g.getPlayerCoords().x == xBackups + randomChangeXs && g.getPlayerCoords().y == yBackups + randomChangeYs) {
								
								break;
								
							}
							
						}
						else
						{
							
							randomChangeXs = getRandomInt(-25,25);
							
							randomChangeYs = getRandomInt(-25,25);
							
							g.goTo(g.getPlayerCoords().x + randomChangeXs, g.getPlayerCoords().y + randomChangeYs);
							
							randomChangeXs = getRandomInt(-20,20);
							
							randomChangeYs = getRandomInt(-20,20);
							
						}
						
						}
					
						sleep(second * 1);
						
					}
					
					g.mapRightClick(g.getPlayerCoords().x, g.getPlayerCoords().y);
					
					print('Found stockpile.');
					
					sleep(second);
					
					g.mapObjectRightClick(stockpile.id);
					
					sleep(second*5);
					
					var stockpileInfo = g.getStockpileInfo();
					
					if(stockpileInfo != null) {
						
						print('Unloading inventory');
						
						var items = g.getInvItems();
						
						var total = stockpileInfo.total;
						
						var used = stockpileInfo.used;
						
						for(var z = 0; z < items.length; z++) {
							
							for(var boughCheck = 0; boughCheck < checked.length; boughCheck++) {
								
								if(items[z] == 'branch') {
									
									if(used < total) {
										
										sleep(second);
										
										g.takeItem(items[z]);
										
										sleep(second);
										
										g.useItemFromHandOnObject(stockpile.id);
										
										sleep(second * 0.5);
										
										used++;
										
									}
									else
									{
										
										fullStockpiles[fullStockpiles.length] = stockpile.id;
										
									}
									
									break;
									
								}
								
							}
							
						}
						
					}
					else
					{
						
						var timesTried = 0;
						
						var success = false;
						
						while(timesTried < 10) {
							
							timesTried++;
							
							g.mapObjectRightClick(stockpile.id);
							
							sleep(second);
							
							if(g.getStockpileInfo() != null) {
								
								success = true;
								
							}
							
						}
						
						if(success) {
							
							stockpileInfo = g.getStockpileInfo();
							
							print('Unloading inventory');
							
							var items = g.getInvItems();
							
							var total = stockpileInfo.total;
							
							var used = stockpileInfo.used;
							
							for(var z = 0; z < items.length; z++) {
								
								for(var boughCheck = 0; boughCheck < checked.length; boughCheck++) {
									
									if(items[z] == 'branch') {
										
										if(used < total) {
											
											sleep(second);
											
											g.takeItem(items[z]);
											
											sleep(second);
											
											g.useItemFromHandOnObject(stockpile.id);
											
											sleep(second * 0.5);
											
											used++;
											
										}
										else
										{
											
											fullStockpiles[fullStockpiles.length] = stockpile.id;
											
										}
										
										break;
										
									}
									
								}
								
							}
							
						}
						
					}
					
					print('Finished with stockpile');
					
				}
				
			}
			
			if(g.getFreeCharInvCellsCount() >= 16) {
				
				branchWorking = false;

			}
			else
			{
				invNotFull = false;
				
				branchWorking = false;
				
				pickBranches = false;

			}
			
			while(g.getPlayerCoords().x != previousCoords.x && g.getPlayerCoords().y != previousCoords.y) {
				
				var randomChangeXss = getRandomInt(-10,10);
				
				var randomChangeYss = getRandomInt(-10,10);
				
				var timesStuckz = 0;
				
				var totalTimesStuckz = 0;
				
				if(!isPorkStuck()) {
					
					timesStuckz = 0;
					
					g.goTo(previousCoords.x + randomChangeXss, previousCoords.y  + randomChangeYss);
					
					print('Going to previous location');
					
					}
					else
					{
					
					timesStuckz++;
					
					totalTimesStuckz++;
					
					if(totalTimesStuckz > 50) {
						
						print('Stuck too many times... Skipping.');
						
						break;
						
					}
					
					print('Stuck');
					
					if(timesStuckz < 4) {
						
						randomChangeXss = getRandomInt(-20,20);
						
						randomChangeYss = getRandomInt(-20,20);
						
						g.goTo(previousCoords.x + randomChangeXss, previousCoords.y + randomChangeYss);
						
						if(g.getPlayerCoords().x == previousCoords.x + randomChangeXss && g.getPlayerCoords().y == previousCoords.y + randomChangeYss) {
							
							break;
							
						}
						
					}
					else
					{
						
						randomChangeXs = getRandomInt(-25,25);
						
						randomChangeYs = getRandomInt(-25,25);
						
						g.goTo(g.getPlayerCoords().x + randomChangeXs, g.getPlayerCoords().y + randomChangeYs);
						
						randomChangeXs = getRandomInt(-20,20);
						
						randomChangeYs = getRandomInt(-20,20);
						
					}
					
					}
				
					sleep(second * 1);
				
			}
							
		}
		
		}
		else
		{
			
			branchWorking = false;
			
		}
		
	}
	
	}
	
	branchWorking = false;
	
	pickBranches = false;
	
	}
	else
	{
		branchWorking = false;
		
		pickBranches = false;
		
	}
	
}

function isPorkStuck() {
	
	var playerCoords = g.getPlayerCoords();
	
	if (storedPlayerX == playerCoords.x && storedPlayerY == playerCoords.y) {
		
		storedPlayerX = playerCoords.x;
		storedPlayerY = playerCoords.y;
		
		return true;
		
	} else {
		
		storedPlayerX = playerCoords.x;
		storedPlayerY = playerCoords.y;
		
		return false;
		
	}

}

/**
 * 
 */

function printObjectNamesOnScreen()
{
	var mapObjects = g.getAllMapObjects();
	  for (var i = 0; i < mapObjects.length; ++i) {
	    var mapObject = mapObjects[i];
	    print('Name: ' + mapObject.name + ' - FullName: '+ mapObject.fullName + ' - ID: '+ mapObject.id);
	}
}

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



/**
 * 
 */

