/**
 * 
 */


/*
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
*/