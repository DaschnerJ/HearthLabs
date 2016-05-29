/**
 * 
 */

var choppingTrees = false;

function chopWood()
{
	while(choppingTrees)
	{
		regenStamina();
		var targetTree = findClosestTree();
		walkTo(targetTree.x, targetTree.y, 10);
		chopTree(targetTree);	
	}
}

function regenStamina()
{
	var stamina = g.getStamina()
	waitForStamina(stamina, 95);
}

function waitForStamina(stamina, target)
{
	if(stamina < target)
	{
		sleep(second*10);
		waitForStamina(stamina, target);
	}
}

function pickOption(option)
{
	 
	for(var i = 0; i < options.length; i++) {
	  
		if(options[i] == option) {
	   
			g.chooseFlowerMenuOption(option);
			return true;
	   
		}
	  
	}
	return false;
	 
}

function chopTree(targetTree)
{
	g.mapObjectRightClick(targetTree.id);
	sleep(second*5);
	if(pickOption('Chop'))
	{
		g.waitForTaskToFinish();
		if(targetTree != null)
			{
				chopTree(targetTree);
			}
	}
}


function findClosestTree()
{
	  var nearestTree = null;

	  var playerCoords = g.getPlayerCoords();
	  
	  var nearestTreeDistance = null;
	  var mapObjects = g.getAllMapObjects();
	  for (var i = 0; i < mapObjects.length; ++i) {
	    var mapObject = mapObjects[i];

	    if (mapObject.name == 'body') {
	      continue;
	    }
	    else if(isTree(mapObject))
	    {
	    	var distance = getDistance(playerCoords, mapObject.coords);
		    if (nearestTree == null || distance < nearestTreeDistance) {
		      nearestTree = mapObject;
		      nearestTreeDistance = distance;
		    }
	    }
	    
	  }

	  return nearestTree;
}
