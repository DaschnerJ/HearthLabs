/**
 * 
 */

/**
 * Determines what happens on login.
 */
function gameStart() {
	if (debug) {
		print('Travel to hearth fire...');
		g.travelToHearthFire();
		if (debug)
			print('Sleep 10 seconds...');
		sleep(second * 10);
	}
	print('Starting autowalking...');
	startAutoWalking();
	print('Starting new asynchronous process...');
	var async = new asyncThread();
	print('Creating needed instances...');
	async.createInstances();
	print('Start the asynchronous task queue.');
	async.asyncTask();
	print('Asynchronous processes are established!');
}