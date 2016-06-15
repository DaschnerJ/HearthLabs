/**
 * 
 */

function asyncThread() {
	//Bots
	var chopperBot;
	var beastWatcherBot;
	var boarderBot;
	var blockerBot;
	var landForagerBot;

	this.updateTasks = true;
	/**
	 * Controls the bot tasks queue.
	 */
	this.asyncTask = function() {
		if (updateTasks) {
			async = setInterval(function() {
				beastWatcherBot.runBeastWatcher();
				chopperBot.runChopper();
				boarderBot.runBoardCutter();
				blockerBot.runBlockChopper();
				landForagerBot.runLandForager();
			}, second);
		}
	}

	/**
	 * Creates the initial needed instances of each bot.
	 */
	this.createInstances = function() {
		beastWatcherBot = new BeastWatcher();
		chopperBot = new qChopper();
		boarderBot = new qBoardCutter();
		blockerBot = new qBlockChopper();
		landForagerBot = new qLandForager();
	}

}