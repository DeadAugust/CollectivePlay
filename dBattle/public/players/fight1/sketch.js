// PLAYERS -- Fight Screen Team 1

// Open and connect socket
let socket = io('/players/fight1');

var team1 = [];
var team2 = [];

var d = 60; //diameter of bubbles
var phase = false; //if false, targeting phase, if true, roll phase

function setup(){
  //- - - - - overall
	// var screenSize = windowHeight - 100;
	// createCanvas(int(screenSize * .666), screenSize);
	createCanvas(windowWidth, windowHeight);
	background(0, 150, 50);


  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
  });

	// - - - - - heartbeat
	socket.on('heartbeat',
		function(dteam2ata){
		}
	);

	socket.on('team1',
		function(bubbles){
			console.log('got 1')
			team1 = bubbles;
		});

	socket.on('team2',
		function(bubbles){
			console.log('got 2')
			team2 = bubbles;
		});
}

function draw(){
	bubbleTeam1();
	bubbleTeam2();
}

function mousePressed(){
	if (!phase){
		for (var i = 0; i < team1.length; i++){
			team1[i].attacker = false;
			if (dist(mouseX, mouseY, team1[i].x, team1[i].y) <= d){
				team1[i].attacker = true;
			}
		}
		for (var i = 0; i < team2.length; i++){
			team2[i].target = false;
			if (dist(mouseX, mouseY, team2[i].x, team2[i].y) <= d){
				team2[i].target = true;
			}
		}
	}
}

function bubbleTeam1(){
	// for (var i = bubbles.length; i >= 0; i--){
	for (var i = 0; i < team1.length; i++){
		fill(team1[i].r, team1[i].g, team1[i].b);
		team1[i].x = (i + 1) * width/4;
		team1[i].y = 9 * height/12;
		ellipse(team1[i].x, team1[i].y, d, d);
		text(team1[i].name,(i + 1) * width/4, 10 * height/12);
		if ((team1[i].target == true) || (team1[i].attacker == true)){
			ellipse((i+1) * width/4, 9 * height/12, d+10, d+10);
		}
	}
}

function bubbleTeam2(){
	// for (var i = bubbles.length; i >= 0; i--){
	for (var i = 0; i < team2.length; i++){
		fill(team2[i].r, team2[i].g, team2[i].b);
		team2[i].x = (i + 1) * width/4;
		team2[i].y = 9 * height/12;
		ellipse(team2[i].x, team2[i].y, d, d);
		text(team2[i].name,(i + 1) * width/4, 3 * height/12);
		if ((team2[i].target == true) || (team2[i].attacker == true)){
			ellipse((i+1) * width/4, 2 * height/12, d+10, d+10);
		}
	}
}
