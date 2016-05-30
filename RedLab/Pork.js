
var lookForCurious = false;
var worldCheckerId = null;
var checkedTrees = [];
var fullStockpiles = [];
var finishedTask = false;
var working = false;
var pickBoughs = false;
var previousLocation = null;

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
		if(g != null && !working) {
			checkTheMap();	
		}
	}, second * 10);
	
}

function checkTheMap() {
	
	if(pickBoughs) {
	
	working = true;
	
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
		
		for(var x = 0; checkedTrees.length < x; x++) {
						
			if(checkedTrees[x] == map.id) {
				
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
				
				if(!isStuck()) {
					
				timesStuck = 0;
				
				walkToStart(xBackup + randomChangeX, yBackup + randomChangeY, 10);
				
				print('Going');
				
				}
				else
				{
				
				timesStuck++;
				
				totalTimesStuck++;
				
				if(totalTimesStuck > 20) {
					
					print('Stuck too many times... Skipping.');
					
					finishedTask = true;
					
					break;
					
				}
				
				print('Stuck');
				
				if(timesStuck < 4) {
					
					randomChangeX = getRandomInt(-15,15);
					
					randomChangeY = getRandomInt(-15,15);
					
					walkToStart(xBackup + randomChangeX, yBackup + randomChangeY, 5);
					
					if(g.getPlayerCoords().x == xBackup + randomChangeX && g.getPlayerCoords().y == yBackup + randomChangeY) {
						
						break;
						
					}
					
				}
				else
				{
					
					randomChangeX = getRandomInt(-25,25);
					
					randomChangeY = getRandomInt(-25,25);
					
					walkToStart(g.getPlayerCoords().x + randomChangeX, g.getPlayerCoords().y + randomChangeY, 5);
					
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
			
			checkedTrees[checkedTrees.length] = map.id;
			
		}
		
		}
		else
		{
			
			print('Inventory needs emptying');
			
			index--;
			
			index = Math.max(0, index);
			
			previousCoords = g.getPlayerCoords();
			
			g.goTo(g.getPlayerCoords().x,g.getPlayerCoords().y);
			
			sleep(1000);
			
			var stockpiles = g.getMapObjects('stockpile-bough');
			
			print('Checking for stockpile-bough');
			
			for(var ind = 0; ind < stockpiles.length ; ind) {
				
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
						
						if(!isStuck()) {
							
						timesStucks = 0;
						
						walkToStart(xBackups + randomChangeXs, yBackups + randomChangeYs, 10);
						
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
							
							walkToStart(xBackups + randomChangeXs, yBackups + randomChangeYs, 5);
							
							if(g.getPlayerCoords().x == xBackups + randomChangeXs && g.getPlayerCoords().y == yBackups + randomChangeYs) {
								
								break;
								
							}
							
						}
						else
						{
							
							randomChangeXs = getRandomInt(-25,25);
							
							randomChangeYs = getRandomInt(-25,25);
							
							walkToStart(g.getPlayerCoords().x + randomChangeXs, g.getPlayerCoords().y + randomChangeYs, 5);
							
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
				
			}
			else
			{
				invNotFull = false;
			}
				
			working = false;
			
		}
		
		}
		else
		{
			
			working = false;
			
		}
		
	}
	
	}
	
	working = false;
	
	}
	else
	{
		working = false;
	}
	
}
