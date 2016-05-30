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
					g.mapRightClick(toX + getRandomInt(-10,10), toY + getRandomInt(-10,10));
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