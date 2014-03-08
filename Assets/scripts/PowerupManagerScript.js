#pragma strict

static function GoldenBalloon () {

	Debug.Log("Golden balloons!");
	
	// Make all current balloons solid
	// Make all current balloons golden/patterned
	BalloonScript.PowerupGoldenBalloons();
	
	// Make next few rows of balloons solid
	// Make next few rows of balloons gold/patterned
	BalloonSpawnScript.PowerupGoldenBalloons();
}