/**
 * 
 */
//Main Global Variables
/**
 * A game second.
 */
var second = 1000;
/**
 * To allow debugging.
 */
var debug = true;
/**
 * Multiply by this variable to convert to tiles.
 */
var tileUnit = 1/10;

//Toggles
var agroToggle = false;

var RedAutoWalkingSwitch = true;

var RedWalkDefault = false;

var WalkToSwitch = false;

var ignoreStuckCount = false;

var updateTasks = true;

var isStuckCooldown = 0;

var directionCount = 0;

var xDirection = 0;
var yDirection = 0;

var oldPlayerX = 0;
var oldPlayerY = 0;

var toX = 0;
var toY = 0;
var toP = 0;

var nearestObjectDistance = null;

//For monitoring animals

var beastWatchList = new Array();

var AllowHostile = true;

var AllowPlayer = false;

var AllowFriendly = false;

//Automation run booleans.

var qChopperRun = false;

var qBlockChopperRun = false;

var qBoardCutterRun = false;

var qLandForagerRun = false;

var qBoughPickerRun = false;

var qBranchPickerRun = false;

var qStumperRun = false;

var qLogerRun = false;

var BeastWatcherRun = false;


