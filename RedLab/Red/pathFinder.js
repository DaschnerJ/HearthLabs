/**
 * 
 */

/**
 * Function called on to enable walking from path finder in priority order.
 * Order of Importance: Random, Target, None.
 */
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

/**
 * Walks to a specific point. If it gets stuck, it tries to remove itself by walking randomly. Once near set target
 * coordinates, the function turns off.
 */
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

/**
 * Method for default random walking.
 */
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

/**
 * Determines when a new direction is needed and sets a new direction and amount of steps
 * for that direction.
 */
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

/**
 * Determines if the bot is stuck or not.
 * @returns {Boolean} returns true if the bot is stuck, false if it is not.
 */
function isStuck()
{
	var playerCoords = g.getPlayerCoords();
	if(oldPlayerX == playerCoords.x && oldPlayerY == playerCoords.y)
	{
		if(isStuckCooldown <= 0 && !ignoreStuckCount)
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

