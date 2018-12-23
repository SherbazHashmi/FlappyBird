var canvas = document.getElementById("canvas")
var context = canvas.getContext("2d")

// Setup Images
	var bird = this.initImage("bird.png")
	var bg = initImage("bg.png")
	var fg = this.initImage("fg.png")
	var pipeSky = this.initImage("pipeNorth.png")
	var pipeGround = this.initImage("pipeSouth.png")

	function initImage(fileName) {
		var image = new Image();
		image.src = "images/" + fileName
		return image
	};
	
	function draw() {
		context.drawImage(bg,0,0);
		
	} 
	
	bg.onload = function() {
		alert(bg.src)
	}
	
	
	draw();

