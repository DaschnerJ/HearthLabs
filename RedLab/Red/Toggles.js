/**
 * 
 */

/**
 * Toggles walking to target coordinates on and off.
 */
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

/**
 * Toggles walking randomly in a direction on and off.
 */
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

/**
 * Toggles if the red bot can walk control walking or not.
 */
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

/**
 * Toggles if the bot can user the chopper to chop down trees or not.
 */
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

/**
 * Toggles if bot can hearth home if in danger or not.
 */
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

/**
 * Toggles if the bot can use the Log Collector script to collect logs or not.
 */
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