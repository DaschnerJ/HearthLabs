/**
 * 
 */
 var RedAutoWalkingSwitch = true;
 
var directionCount = 0;

var xDirection = 0;
var yDirection = 0;

var oldPlayerX = 0;
var oldPlayerY = 0;

function gameStart()
{
  print('Travel to hearth fire...');
  g.travelToHearthFire();
  if(debug)
  print('Sleep 10 seconds...');
  sleep(second*10);
  print('Starting autowalking...');
  startAutoWalking();
}

function walk()
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
		if(debug)
			print('Player is stuck!');
		oldPlayerX = playerCoords.x;
		oldPlayerY = playerCoords.y;
		return true;
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

/** Gets a random direction count between min an max.
 * @param min
 * @param max
 * @returns
 */
function getDirectionCount(max)
{
	return getRandomInt(0, max).toFixed(0);
}