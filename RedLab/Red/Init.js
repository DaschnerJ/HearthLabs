/**
 * 
 */

/**
 * Determines what happens on login.
 */
function gameStart()
{
	if(debug){
		print('Travel to hearth fire...');
		g.travelToHearthFire();
		if(debug)
			print('Sleep 10 seconds...');
		sleep(second*10);
	}
  print('Starting autowalking...');
  startAutoWalking();
}
