/* based on Tradetatos
a mobile game demo by August Luhrs
for ITP's ICM final project
huge thanks to Allison Parrish, Dan Shiffman, and Shawn Van Every
*/

var socket = io();

var startButton;
var atmans = [];

function setup(){
  createCanvas(windowWidth-100,windowHeight-100);
  textAlign(CENTER);
  textSize(height/10);
  background(0,150,50);
  startButton = createButton('start Game');
  startButton.parent('myCanvas');
  startButton.position(4* width/5, height/8);
  startButton.mousePressed(startGame);

  socket.on('heartbeat',
    function(data){
      atmans = data.atmans;
      // console.log(atmans);
    }
  );
}


function draw (){
  if(startTime){
    //map
    background(0,150,50);
  }
  else{ //loading dock waiting screen
    background(51, 204, 51);
    noStroke();
    fill(0, 102, 153);
    textSize(height/8);
    text('Players:', width/2, height/8);
    textSize(height/(8 + atmans.length));
    hLine = (height-100)/(atmans.length + 1);
    for(var i = 0; i < atmans.length; i++){
      fill(atmans[i].r, atmans[i].g, atmans[i].b);
      text(atmans[i].name, width/2, ((i+1) * hLine) + 100);
    }
  }
}

function startGame(){
  socket.emit('startGame');
  console.log('sent');
  startTime = true;
  timer = millis();
  startButton.remove();
}

function Atman(id, x, y, name, r, g, b){
  this.id = id;
  this.x = x;
  this.y = y;
  this.name = name;
  this.r = r;
  this.g = g;
  this.b = b;
  this.t;
  this.m;
  this.u;
}
