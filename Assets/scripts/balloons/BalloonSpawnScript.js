﻿#pragma strict

// Main game camera
var cam: Camera;
private var camWidth:float;

// Balloon objects to be spawned
var defaultBalloons: GameObject[];
var singleUseBalloons: GameObject[];
var trapBalloons: GameObject[];

// Number of balloons possible on a row
var gridPerRow: int 		= 6;
private var gridItemWidth:float;

// Y position of starting row
var startY: float 			= -5;
var startRowCount: int		= 5;

// Y distance between rows
// TODO: Make random from a range
var gapY: float 			= 2;
	
// Y value for the next row to be generated 
// (updated each time a new row is added to the scene)
private var nextY: float	= 0;

// Array of x positions corresponding to calculated grid
private var gridX: float[];

// Amount of balloons to show per row
private var easyBalloonsMin:float 	= 0.4f;
private var easyBalloonsMax:float	= 1f;

private var mediumBalloonsMin:float = 0.5f;
private var mediumBalloonsMax:float	= 0.8f;

private var hardBalloonsMin:float 	= 0.5f;
private var hardBalloonsMax:float	= 0.8f;

private var modeBalloonsMin:float	= 0f;
private var modeBalloonsMax:float	= 1f;

function Start () {

	// Ensure next y value is correct to configurable
	// start and gap variables
	nextY = startY + gapY;
	
	// Start game off on easy mode
	// TODO: Make more flexible than 3 settings perhaps
	// TODO: Update different variables to increase difficulty (ie: gap)
	modeBalloonsMin = easyBalloonsMin;
	modeBalloonsMax = easyBalloonsMax;
	
	// Calculate the x position for the grid
	camWidth = cam.ScreenToWorldPoint( new Vector3( Screen.width, 0f, 0f ) ).x * 2;
	
	gridItemWidth = camWidth / gridPerRow;
		
	Debug.DrawLine (new Vector3(camWidth, 0f, -10f), new Vector3(camWidth, 1f, -10f), Color.blue);
	Debug.DrawLine (new Vector3(-camWidth, 0f, -10f), new Vector3(-camWidth, 1f, -10f), Color.blue);
	
	// Draw initial balloon row
	DrawStartRows();
}

function DrawStartRows() {

	for (var i:int = 0; i < startRowCount; i += 1) {
	
		DrawRow();
	}
}

function DrawRow () {

	var posX:float;
	
	var min:int = Mathf.CeilToInt( modeBalloonsMin * gridPerRow );
	var max:int = Mathf.CeilToInt( modeBalloonsMax * gridPerRow );	
	
	var toDraw:int = Random.Range(min, max);
			
	for (var i:int = 0; i < gridPerRow; i += 1) {
	
		// Break loop if enough balloons have been drawn
		if (!toDraw) break;
		
		// If we can afford to leave a gap, maybe leave one
		if ((gridPerRow - i) > toDraw) {
		
			if ( Random.Range(0f, 1f) > 0.5 ) {
				continue;
			}
		}
	
		posX = (i+1) * gridItemWidth - (gridItemWidth / 2) - camWidth / 2;
		Instantiate( defaultBalloons[Random.Range(0, defaultBalloons.length)], new Vector3(posX, nextY, 0f), Quaternion.identity );

		Debug.DrawLine (new Vector3(posX, nextY, -10f), new Vector3(posX, nextY+1, -10f), Color.red);
		
		toDraw--;
	}

	// Update the location for the next row
	nextY += gapY;
}