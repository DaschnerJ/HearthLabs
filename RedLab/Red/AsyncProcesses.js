/**
 * 
 */

function asyncThread()
{
	
	this.updateTasks = true;
	
	this.asyncTask()
	{
		if(updateTasks)
		{
			async = setInterval(function() 
			  {
				chopperBot.runChopper();
			  }, second);
		}
	}
	
	var createInstances = function()
	{
		chopperBot = new qChopper();
	}
	
}