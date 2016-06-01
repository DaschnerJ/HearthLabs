/**
 * 
 */
//Toggles
var agroToggle = false;

var RedAutoWalkingSwitch = true;

var RedWalkDefault = false;

var WalkToSwitch = false;

var ignoreStuckCount = false;

//Chopper
var choppingTrees = false;
var finishedCutting = true;
var targetTree;
var stamina;
var targetTreeCount = 0;
var treeChoppedList = new Array();

//Log Collector
var collectLogs = false;
var listOfLogs = new Array();
var listOfCollectedLogs = new Array();
var targetLog = null;
var hearthX = 0;
var hearthY = 0;

var logStockpileX = 0;
var logStockpileY = 0;

var holdingLog = false;

//Path Finder

var isStuckCooldown = 0;

var directionCount = 0;

var xDirection = 0;
var yDirection = 0;

var oldPlayerX = 0;
var oldPlayerY = 0;

var toX = 0;
var toY = 0;
var toP = 0;

//qChopper

var qChopperRun = false;