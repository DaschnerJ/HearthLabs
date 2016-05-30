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