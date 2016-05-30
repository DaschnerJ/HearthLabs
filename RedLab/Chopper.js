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
		walkTo(targetTree.x+getRandomInt(-20,20), targetTree.y+getRandomInt(-20,20), 10);
		print('The target is: ' + targetTree.name);
		print('Chopping tree.')
		chopTree();
		sleep(second*5);
	}
}

function regenStamina()
{
	waitForStamina(95);
}

function waitForStamina(target)
{
	stamina = g.getStamina()
	if(stamina < target)
	{
		print('Stamina not enough, it is: ' + stamina);
		print('Waiting 10 seconds...')
		sleep(second*10);
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
		walkTo(targetTree.x+getRandomInt(-20,20), targetTree.y+getRandomInt(-20,20), 10);
		chopTree();
		
	}
	else
	{
		print('Target tree probably not still there...');
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
	  var mapObjects = g.getAllMapObjects();
	  for (var i = 0; i < mapObjects.length; ++i) {

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
	    		var distance = getDistance(playerCoords, mapObjects[i]);
	    		if (targetTree == null || distance < nearestTreeDistance) {
	    			targetTree = mapObjects[i];
	    			nearestTreeDistance = distance;
	    		}
	    	}
	    }
	    else
	    {
	    	
	    }
	    
	  }

}
