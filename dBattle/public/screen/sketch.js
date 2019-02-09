// SCREEN
// Open and connect socket
let socket = io('/screen');

var team1 = [];
var team2 = [];

function setup(){
  //- - - - - overall
	// var screenSize = windowHeight - 100;
	// createCanvas(int(screenSize * .666), screenSize);
	createCanvas(windowWidth, windowHeight);
	background(0, 50, 150);


  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
  });

	// - - - - - heartbeat
	socket.on('heartbeat',
		function(data){
		}
	);

	socket.on('team1',
		function(bubbles){
			console.log('got it')
			team1 = bubbles;
		});
}

function draw(){
	bubbleTeam1();
}

function bubbleTeam1(){
	// for (var i = bubbles.length; i >= 0; i--){
	for (var i = 0; i < team1.length; i++){
		fill(team1[i].r, team1[i].g, team1[i].b);
		ellipse((i + 1) * width/4, 10 * height/12, 60, 60);
		text(team1[i].name,(i + 1) * width/4, 11 * height/12);
	}
}
