#pragma strict

var pop: Transform;

function Update () {

	// Ensures camera moves up with Pop but doesn't ever move down
	transform.position.y += pop.position.y > transform.position.y ? pop.position.y - transform.position.y : 0;
}