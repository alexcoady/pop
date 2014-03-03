﻿#pragma strict

// Main game camera
var cam: Camera;
private var camWidth:float;
private var camY:float = 0;

// Balloon objects to be spawned
var defaultBalloons: GameObject[];
var singleUseBalloons: GameObject[];
var trapBalloons: GameObject[];

// Number of balloons possible on a row
private var gridPerRow: int 		= 6;
private var gridItemWidth:float;

// Y position of starting row
private var startY: float 			= -5;
private var startRowCount: int		= 6;

// Y distance between rows
// TODO: Make random from a range
private var gapY: float;
private var gapYMin:float			= 2;
private var gapYMax:float			= 2.9;
	
// Y value for the next row to be generated 
// (updated each time a new row is added to the scene)
private var nextY: float	= 0;

// Array of x positions corresponding to calculated grid
private var gridX: float[];

private var balloonsMin:float	= .6f;
private var balloonsMax:float	= 1f;

var difficulty: float = 1;
var difficultyMax:float = 5;

function Awake () {

	Application.targetFrameRate = 60;
}

function Start () {

	GenerateGapY();
	// Ensure next y value is correct to configurable
	// start and gap variables
	nextY = startY + gapY;
	
	// Calculate the x position for the grid
	camWidth = cam.ScreenToWorldPoint( new Vector3( Screen.width, 0f, 0f ) ).x * 2;
	
	camY = cam.transform.position.y;
	
	gridItemWidth = camWidth / gridPerRow;
		
	Debug.DrawLine (new Vector3(camWidth, 0f, -10f), new Vector3(camWidth, 1f, -10f), Color.blue);
	Debug.DrawLine (new Vector3(-camWidth, 0f, -10f), new Vector3(-camWidth, 1f, -10f), Color.blue);
	
	// Draw initial balloon row
	DrawStartRows();
}

function GenerateGapY() {

	gapY = Random.Range( gapYMin, gapYMax );
}

function FixedUpdate () {
	
	if (cam.transform.position.y - gapY >= camY) {
	
		DrawRow();
		camY += gapY;
	}
	
	difficulty += (difficulty >= difficultyMax ? 0 : 0.001);
	
	if (difficulty >= 5) {
	
		balloonsMin = 0.1f;
		balloonsMax = 0.3f;
	
	} else if (difficulty > 3) {
	
		balloonsMin -= 0.2f;
		balloonsMax -= 0.2f;
	
	} else if (difficulty > 2) {
	
		balloonsMin -= 0.2f;
		balloonsMax -= 0.2f;
	}
}

function DrawStartRows() {

	for (var i:int = 0; i < startRowCount; i += 1) {
		DrawRow();
	}
}

function DrawRow () {

	var posX:float;
	var min:int = Mathf.CeilToInt( balloonsMin * gridPerRow );
	var max:int = Mathf.CeilToInt( balloonsMax * gridPerRow );	
	var toDraw:int = Mathf.MaxValue(Random.Range(min, max), 1); // Ensures always at least 1
	var isPossible:boolean = false;
			
	for (var i:int = 0; i < gridPerRow; i += 1) {
	
		// Break loop if enough balloons have been drawn
		if (toDraw == 0) break;
		
		// If we can afford to leave a gap, maybe leave one
		if ((gridPerRow - i) > toDraw) {
		
			if ( Random.Range(0f, 1f) > 0.5 ) {
				continue;
			}
		}
	
		posX = (i+1) * gridItemWidth - (gridItemWidth / 2) - camWidth / 2;
		
		var balloon: Object;
		var rand = Random.Range(0f, 10f);
		
		// If the row is currently impossible and there's one balloon left - make it possible
		if ( !isPossible && toDraw == 1 ) {
		
			Debug.Log("Row is impossible, make possible now");	
		
			if ( rand > 5 ) {
				balloon = defaultBalloons[Random.Range(0, defaultBalloons.length)];
			} else {
				balloon = singleUseBalloons[Random.Range(0, singleUseBalloons.length)];
			}
			
		} else if ( rand > 5 ) {
		
			balloon = defaultBalloons[Random.Range(0, defaultBalloons.length)];
			isPossible = true;
		
		} else if ( rand > 3 ) {
		
			balloon = singleUseBalloons[Random.Range(0, singleUseBalloons.length)];
			isPossible = true;
		
		} else {
		
			balloon = trapBalloons[Random.Range(0, trapBalloons.length)];
		}
						
		Instantiate( balloon, new Vector3(posX, nextY, 0f), Quaternion.identity );

		Debug.DrawLine (new Vector3(posX, nextY, -10f), new Vector3(posX, nextY+1, -10f), Color.red);
		
		GenerateGapY();
		toDraw--;
	}

	// Update the location for the next row
	nextY += gapY;
}