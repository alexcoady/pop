#pragma strict

var isMovingThroughBalloon: boolean = false;

function OnTriggerEnter2D (hit: Collider2D) {

	Debug.Log(hit.tag);

	if ( hit.CompareTag("Player") ) {
	
		Debug.Log("Player hit balloon");
	
		// If player is moving upwards, ignore collision
		if ( hit.gameObject.rigidbody2D.velocity.y > 0 ) {
			isMovingThroughBalloon = true;
			return;
		}
		
		if (isMovingThroughBalloon) {
			return;
		}
		
		// If player is moving downwards/still, jump on balloon
		hit.gameObject.BroadcastMessage("Hop");
	}
}

function OnTriggerExit2D () {

	isMovingThroughBalloon = false;
}