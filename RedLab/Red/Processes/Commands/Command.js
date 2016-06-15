/**
 * 
 */
function Command(command, Actions)
{
	//Private Variable
	var actions = new Array();
	actions = Actions;
	var str = command;
	
	//Public Variable
	this.publicVariable;
	
	//Private Method
	var somePrivateFunction = function()
	{
		
	}
	
	//Public Method
	this.somePublicFunction = function()
	{
		somePrivateFunction();
	}
	
}