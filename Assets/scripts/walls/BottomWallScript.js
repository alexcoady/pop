#pragma strict

function OnTriggerEnter2D (hit: Collider2D) {

	if ( hit.tag == "Player" ) {
	
		Destroy( hit.gameObject );
		Application.LoadLevel(1);
	}
}