// HTML Links

var cvs = document.getElementById("canvas")
var cxt = cvs.getContext("2d")
let score_text = document.getElementById("score")
let debug_text = document.getElementById("debug")


// Game Variables

let gap = 100;
let minDistance = 0
let gravity = 1.5; 
let jump = 45;
var bx = 10
var by = cvs.height / 2  - 100
var pipeSpeed = 1
var alive = true;
var score = 0;
var pipe = []

// Setup Images

var bird = initImage("bird.png")
var bg = initImage("bg.png")
var fg = initImage("fg.png")
var pipeSky = initImage("pipeNorth.png")
var pipeGround = initImage("pipeSouth.png")

// Initialise Image Function

function initImage(fileName) {
	var image = new Image();
	image.src = "images/" + fileName
	return image
};

// OnTouch

canvas.addEventListener("touchstart", function(e) {
 	bx += 0
	by -= jump
 e.preventDefault()
 }, false);

// Initialise first pipe.

pipe[0] = {
	x : cvs.width,
	y : 0
};

// Draw Frame Method

function draw() {
	minDistance = pipeSky.height + gap
	isCollision()	
	dropDead()
	cxt.drawImage(bg,0,0);
	
	// Drawing Pipes
	
	for (var i = 0; i < pipe.length; i ++) {
		cxt.drawImage(pipeSky, pipe[i].x, pipe[i].y)
		cxt.drawImage(pipeGround, pipe[i].x, pipe[i].y + minDistance)
		
		pipe[i].x = pipe[i].x - pipeSpeed;	
		
		if(pipe[i].x == 125) {
			pipe.push({
				x : cvs.width,
				y : Math.floor((Math.random() * pipeSky.height) -pipeSky.height)
			});
		}
	}
	
	cxt.drawImage(fg, 0, minDistance + fg.height)
	cxt.drawImage(bird, bx, by)
	applyGravity(gravity)
	scoreKeeper()
	setScore()
	requestAnimationFrame(draw);
} 

// Apply Gravity

function applyGravity(gravity) {
	by = by + gravity
}


// Handles Collisions

function isCollision() {

	
	// Handling Ground Collision 
	if(by >= 435) {
		gameOver();
	} else if (by <= 0 ) {
		gameOver();
	}
	
	pipe.forEach(function(pipe) {
		if ((bx >= pipe.x - (pipeSky.width / 2 + 10)) && (bx <= pipe.x + pipeSky.width / 2))
		{ 
			if(by <= pipeSky.height + pipe.y) {
				gameOver();
			} else if (by >= pipe.y + pipeGround.height - (bird.height * 2)) {
				gameOver();
			} 	
		} 
		 
	});
}

//  Handles GameOver Event

function gameOver() {
	alive = false;
	gravity = 0;
	pipeSpeed = 0;
	jump = 0;
	
}

// Handles Drop Dead

function dropDead() {
	if(alive == false && by < 433.5) {
		by = by + 10;
	} 
}

// Keeps Score Updated

function scoreKeeper() {
		
		pipe.forEach(function(pipe) {
		
		while(bx == (pipe.x + pipeGround.width / 2 + (bird.width / 2)))
		{ 
			score++;
			break;
		} 
		 
	});
}

// Draws GameOver Window

function gameOverWindow() {
	
}

// Logs Error

function log(input) {
	debug_text.textContent = input
}

// Sets Score

function setScore() {
	score_text.textContent= score + " Points";		
}

// Actual Code Run

draw();

