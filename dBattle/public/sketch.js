// Open and connect socket
let socket = io();

var atman;
var atmans = [];

//- - - - - player setup
var input, submit, redSlide, greenSlide, blueSlide, colorChoose, startButt;
var name = ' ';
var redCol = 0;
var greenCol = 0;
var blueCol = 0;
var shapeYes = true; //no shapes yet
var colorYes = false; //if selected color
var nameYes = false; //if input name
var joined = false; //if they've left character creation
var tutorial = false; //if they did the tutorial
var gameSetup = false; //game setup after player creation UGH "setup"

function setup(){
  //- - - - - overall
	var screenSize = windowHeight - 100;
	var canvas = createCanvas(int(screenSize * .666), screenSize);
 	canvas.parent('myCanvas');
	background(0, 150, 50);
	textAlign(CENTER);

	// - - - - -  player start screen
	textSize(30);
	fill(0);
	text('Choose Your Color', width/2, height/12);
	redSlide = createSlider(0,255,40);
	redSlide.position(width/3, 3 * height/7 - height/20);
	greenSlide = createSlider(0,255,255);
	greenSlide.position(width/3, 3 * height/7);
	blueSlide = createSlider(0,255,188);
	blueSlide.position(width/3, 3 * height/7 + height/20);
	colorChoose = createButton('I want to be this color!');
	colorChoose.parent('myCanvas'); //need?
	colorChoose.position(width/3, 4 * height/7);
	colorChoose.mousePressed(colorPush);
	text('Enter Your Name', width/2, 8 * height/12);
	input = createInput('type name here');
	input.parent('myCanvas');
	input.position(width/4, 5 * height / 7);
	submit = createButton('submit name');
	submit.parent('myCanvas');
	submit.position(3* width/4, 5 * height / 7);
	submit.mousePressed(playerName);

  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
  });

	// - - - - - heartbeat
	socket.on('heartbeat',
		function(data){
			atmans = data.atmans;
		}
	);
}
