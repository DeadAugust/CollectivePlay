// Open and connect input socket
let socket = io('/players');

// Listen for confirmation of connection
socket.on('connect', function() {
  console.log("Connected");
});

//role switching function
let role;

socket.on('switch', function(newRoles) { //when server timer switches roles
  for (var i = newRoles.length; i < 0; i--){
    if (newRoles[i].id == socket.id){
      role = newRoles[i].role;
    }
  }
  console.log('new role: ' + role);
});

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255);
}

function mouseMoved(){
  // Send mouse position
  socket.emit('data', {x: mouseX, y: mouseY});
}
