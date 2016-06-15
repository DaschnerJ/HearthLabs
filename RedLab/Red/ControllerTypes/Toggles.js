/**
 * 
 */

/**
 * Toggles walking to target coordinates on and off.
 */
function walkToToggle() {
	if (WalkToSwitch) {
		print('Walking to target has stopped...');
		WalkToSwitch = false;
	}
	else {
		print('Walking to target has resumed...');
		WalkToSwitch = true;
	}
}

/**
 * Toggles walking randomly in a direction on and off.
 */
function walkDefaultToggle() {
	if (RedWalkDefault) {
		print('Red Walking has stopped...');
		RedWalkDefault = false;
	}
	else {
		print('Red Walking has resumed...');
		RedWalkDefault = true;
	}
}

/**
 * Toggles if the red bot can walk control walking or not.
 */
function walkAutoToggle() {
	if (RedAutoWalkingSwitch) {
		print('Red Auto Walking has stopped...');
		RedAutoWalkingSwitch = false;
	}
	else {
		print('Red Auto Walking has resumed...');
		RedAutoWalkingSwitch = true;
	}
}

/**
 * Toggles if the bot can user the chopper to chop down trees or not.
 */
/*
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
*/

/**
 * Toggles on and off the qChopper bot.
 */
function qChopperToggle() {
	if (qChopperRun) {
		print('qChopper Bot has stopped...');
		qChopperRun = false;
		RedWalkDefault = false;
		WalkToSwitch = false;
	}
	else {
		print('qChopper Bot has resumed...');
		qChopperRun = true;
	}
}

/**
 * Toggles on and off the qStumper bot.
 */
function qStumperToggle() {
	if (qStumperRun) {
		print('qStumper Bot has stopped...');
		qStumperRun = false;
		RedWalkDefault = false;
		WalkToSwitch = false;
	}
	else {
		print('qStumper Bot has resumed...');
		qStumperRun = true;
	}
}

/**
 * Toggles on and off the qBoardCutter bot.
 */
function qBoardCutterToggle() {
	if (qBoardCutterRun) {
		print('qBoardCutter Bot has stopped...');
		qBoardCutterRun = false;
		RedWalkDefault = false;
		WalkToSwitch = false;
	}
	else {
		print('qBoardCutter Bot has resumed...');
		qBoardCutterRun = true;
	}
}

/**
 * Toggles on and off the qBlockChopper bot.
 */
function qBlockChopperToggle() {
	if (qBlockChopperRun) {
		print('qBlockChopper Bot has stopped...');
		qBlockChopperRun = false;
		RedWalkDefault = false;
		WalkToSwitch = false;
	}
	else {
		print('qBlockChopper Bot has resumed...');
		qBlockChopperRun = true;
	}
}

/**
 * Toggles on and off the qLandForager bot.
 */
function qLandForagerToggle() {
	if (qLandForagerRun) {
		print('qLandForager Bot has stopped...');
		qLandForagerRun = false;
		RedWalkDefault = false;
		WalkToSwitch = false;
	}
	else {
		print('qLandForager Bot has resumed...');
		qLandForagerRun = true;
	}
}

/**
 * Toggles if bot can hearth home if in danger or not.
 */
function agroToggleSwitch() {
	if (agroToggle) {
		print('Agro Homing has stopped...');
		agroToggle = false;
	}
	else {
		print('Agro Homing has resumed...');
		agroToggle = true;
	}
}

/**
 * Toggles hearthing home and checking for hostile beasts.
 */
function allowHostileToggle() {
	if(AllowHostile)
		{
			print('Hostile Beast Monitoring has stopped...');
			AllowHostile = false;
		}
	else
		{
			print('Hostile Beast Monitoring has resumed...');
			AllowHostile = true;
		}
}

/**
 * Toggles hearthing home and checking for player beasts.
 */
function allowPlayerToggle() {
	if(AllowPlayer)
		{
			print('Player Beast Monitoring has stopped...');
			AllowPlayer = false;
		}
	else
		{
			print('Player Beast Monitoring has resumed...');
			AllowPlayer = true;
		}
}

/**
 * Toggles hearthing home and checking for friendly beasts.
 */
function allowFriendlyToggle() {
	if(AllowFriendly)
		{
			print('Friendly Beast Monitoring has resumed...');
			AllowFriendly = false;
		}
	else
		{
			print('Friendly Beast Monitoring has resumed...');
			AllowFriendly = true;
		}
}

