/**
 * 
 */

function printObjectNamesOnScreen()
{
	var mapObjects = g.getAllMapObjects();
	  for (var i = 0; i < mapObjects.length; ++i) {
	    var mapObject = mapObjects[i];
	    print('Name: ' + mapObject.name + ' - FullName: '+ mapObject.fullName + ' - ID: '+ mapObject.id);
	}
}