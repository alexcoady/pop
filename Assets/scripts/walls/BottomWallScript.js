#pragma strict

function OnTriggerEnter2D (hit: Collider2D) {

	if ( hit.CompareTag("Player") ) {
	
		Destroy( hit.gameObject );
		Application.LoadLevel(1);
	}
	
	if ( hit.CompareTag("Balloon") ) {
	
		Destroy( hit.gameObject );
	}
}