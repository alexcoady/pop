#pragma strict

var maxSpeed:float = 10;
var jumpScale:float = 6;

function Start () {

//	anim = GetComponent("Animator");
}

function FixedUpdate () {

	var move:float = Input.GetAxis("Horizontal");
	rigidbody2D.velocity.x = move * maxSpeed;
}

function Hop () {

	rigidbody2D.velocity.y = rigidbody2D.gravityScale * jumpScale;
}