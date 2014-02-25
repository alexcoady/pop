#pragma strict

var maxSpeed:float = 10;
var jumpScale:float = 6;
private var jumping:boolean = false;

function Start () {

//	anim = GetComponent("Animator");
}

function FixedUpdate () {

	var move:float = Input.GetAxis("Horizontal");
	rigidbody2D.velocity.x = move * maxSpeed;
	
	if( Input.GetKeyDown(KeyCode.Space) && jumping == false ) {
		
		Debug.Log("Jump!");
		rigidbody2D.velocity.y = rigidbody2D.gravityScale * jumpScale;
	}
}