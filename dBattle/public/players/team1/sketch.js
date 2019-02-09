// PLAYERS -- TEAM SELECTION FOR PLAYER 1

//Open and connect socket
let socket = io('/players/team1');

var bubbles = [];

function Bubble(_name, _r, _g, _b){
	this.dad = socket.id;
	this.name = _name;
	this.r = _r;
	this.g = _g;
	this.b = _b;
}

//- - - - - player setup
var nameInput, nameSubmit, redSlide, greenSlide, blueSlide, colorChoose, startButt;
var name = ' ';
var redCol = 0;
var greenCol = 0;
var blueCol = 0;
var bubblePosition = 'First';
var bubblesDone = false; //when team is ready

function setup(){
  //- - - - - overall
	// var screenSize = windowHeight - 100;
	// createCanvas(int(screenSize * .666), screenSize);
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('myCanvas');
	background(0, 150, 50);
	textAlign(CENTER);

	// - - - - -  player start screen
	textSize(30);
	fill(0);
	text('Choose Your Bubble\'s Color', width/2, height/12);
	redSlide = createSlider(0,255,40);
	redSlide.position(width/3, 3 * height/7 - height/20);
	greenSlide = createSlider(0,255,255);
	greenSlide.position(width/3, 3 * height/7);
	blueSlide = createSlider(0,255,188);
	blueSlide.position(width/3, 3 * height/7 + height/20);
	/*
	colorChoose = createButton('This color!');
	colorChoose.parent('myCanvas'); //need?
	colorChoose.position(width/3, 4 * height/7);
	colorChoose.mousePressed(colorPush);
	*/
	text('What\'s its name?', width/2, 7 * height/12);
	nameInput = createInput('type name here');
	nameInput.parent('myCanvas');
	nameInput.position(width/3, 8 * height / 12);
	/*
	nameSubmit = createButton('submit name');
	nameSubmit.parent('myCanvas');
	nameSubmit.position(3* width/4, 5 * height / 7);
	nameSubmit.mousePressed(function(){
		name = nameInput.value();
	});
	*/
	bubbleSubmit = createButton('this bubble\'s ready!');
	bubbleSubmit.parent('myCanvas');
	bubbleSubmit.position(width/3, 9 * height / 12);
	bubbleSubmit.mousePressed(function(){
		var bubble = new Bubble (nameInput.value(), redSlide.value(), greenSlide.value(), blueSlide.value());
		bubbles.push(bubble);
		if (bubblePosition == 'First'){
			bubblePosition = 'Second';
		}
		else if (bubblePosition == 'Second'){
			bubblePosition = 'Last';
		}
		else {
			bubblesDone = true;
			hideDom();
			socket.emit('team1', bubbles);
		}
	});

  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
  });

	// - - - - - heartbeat
	socket.on('heartbeat',
		function(data){

		}
	);
}

function draw() {
	bubbleTeam();
	if (!bubblesDone){
		fill(redSlide.value(), greenSlide.value(), blueSlide.value());
		ellipse(width/2, height/5, height/6, height/6);
		textSize(20);
		fill(redSlide.value(), 0, 0);
		text('red', width/4, 3 * height/7 - height/20);
		fill(0, greenSlide.value(), 0);
		text('green', width/4, 3 * height/7);
		fill(0, 0, blueSlide.value());
		text('blue', width/4, 3 * height/7 + height/20);
	}
	else {
		background (0, 120, 40);
		textSize(32);
		fill(0);
		text('You\'re all set! Good luck!', width/2, height/3);
		textSize(18);
		text('[button] should send to localhost:8000/players/1', width/2, 2 * height/3);
		bubbleTeam();
	}
}
/*
function colorPush(){
	redCol = redSlide.value();
	greenCol = greenSlide.value();
	blueCol = blueSlide.value();
	fill(redCol, greenCol, blueCol);
	text('Nice Color!', 5* width/6, 4 * height/7);
}
*/
function hideDom(){
	nameInput.hide();
	bubbleSubmit.hide();
	redSlide.hide();
	greenSlide.hide();
	blueSlide.hide();
	// colorChoose.hide();
}

function bubbleTeam(){
	// for (var i = bubbles.length; i >= 0; i--){
	for (var i = 0; i < bubbles.length; i++){
		fill(bubbles[i].r, bubbles[i].g, bubbles[i].b);
		ellipse((i + 1) * width/4, 10 * height/12, 60, 60);
		text(bubbles[i].name,(i + 1) * width/4, 11 * height/12);
		// console.log(i);
	}
}
/*
function playerName(){ //for faster debugging remove
	// if (name !== 'me' && name !== 'Me' && name !== 'type name here'
	// 	&& name !== 'please type a different name'){
	name = input.value();
		// nameYes = true;
	}
	else{
		input.value('please type a different name');
	}
}
*/
