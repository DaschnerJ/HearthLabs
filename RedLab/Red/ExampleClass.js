/**
 * 
 */
function ExampleClass()
{
	//Private Variable
	var privateVariable;
	
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

function exampleClassRun()
{
	example = new ExampleClass();
	
	example.publicVariable;
	
	example.somePublicFunction();
}
