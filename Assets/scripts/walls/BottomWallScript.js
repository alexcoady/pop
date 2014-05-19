#pragma strict

function OnTriggerEnter2D (hit: Collider2D) {

	if ( hit.CompareTag("Player") ) {
	
		Destroy( hit.gameObject );
		Application.LoadLevel(1);
	}
	
	if ( hit.CompareTag("Balloon") ) {
			
		if ( hit.collider2D.transform.parent ) {
		
			Destroy( hit.collider2D.transform.parent.gameObject );
		
		} else {
		
			Destroy( hit.gameObject );
		}	
	}
}