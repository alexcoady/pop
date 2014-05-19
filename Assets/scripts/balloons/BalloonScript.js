#pragma strict

private var isMovingThroughBalloon: boolean = false;
var isSingle:boolean = false;
var isTrap:boolean = false;
var isGolden:boolean = false;

var anim:Animator;

function OnTriggerEnter2D (hit: Collider2D) {

	if ( hit.CompareTag("Player") ) {
	
		hit.BroadcastMessage("RecordHeight");

		// If player is moving upwards, ignore collision
		if ( hit.gameObject.rigidbody2D.velocity.y > 0 ) {
			isMovingThroughBalloon = true;
			
			if ( isTrap ) {
				Destroy( this.gameObject );
			}
			return;
		}
		
		if (isMovingThroughBalloon) {
			return;
		}
		
		if ( isTrap ) {
			Destroy( this.gameObject );
			return;
		}
		
		if ( isGolden ) {
			PowerupManagerScript.GoldenBalloon();
		}
		
		// If player is moving downwards/still, jump on balloon
		hit.gameObject.BroadcastMessage("Hop");
		
		if (isSingle) {
			Destroy( this.gameObject );
		}
	}
}

function Start () {

	anim = GetComponent("Animator");
}

function OnTriggerExit2D () {

	isMovingThroughBalloon = false;
}

function PowerupGolden() {

	anim.SetBool("isGolden", true);
	isTrap = false;
	isSingle = false;
}

static function PowerupGoldenBalloons () {
	// Send a message to every balloon
	var balloons = GameObject.FindGameObjectsWithTag("Balloon");
	
	for (var i = 0; i < balloons.length; i++) {
	
		balloons[i].BroadcastMessage("PowerupGolden");
	}
	
	
}