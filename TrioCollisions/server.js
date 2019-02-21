// Create server
let port = process.env.PORT || 8000;
let express = require('express');
let app = express();
let server = require('http').createServer(app).listen(port, function () {
  console.log('Server listening at port: ', port);
});

// Tell server where to look for files
app.use(express.static('public'));

// Create socket connection
let io = require('socket.io').listen(server);

//global variables
var players = []; //contains ids of all connected players
var newRoles = [];
var started = false; //only starts game after start game button pushed on screen

//Role Switching every 30 seconds
//moved to /SCREEN
//interval timer
// setInterval(switchRoles, 3000); //three seconds just for debugging
//
// function switchRoles(){
//   newRoles.push(newRoles[0])
//   newRoles.shift();
//   console.log(newRoles);
//   socket.emit('switch', newRoles);
// }

// Clients in the input namespace
var playerInputs = io.of('/players');
// Listen for input clients to connect
playerInputs.on('connection', function(socket){
  console.log('A player connected: ' + socket.id);
  players.push(socket.id);socket
  console.log('Current number of players connected: '+ players.length);

  // Listen for data messages from this client
  socket.on('data', function(data) {
    // Data comes in as whatever was sent, including objects
    //console.log("Received: 'data' " + data);

    // Send it to all of the clients
    socket.broadcast.emit('update', data);
  });

  // Listen for this input client to disconnect
  // Tell all of the output clients this client disconnected
  socket.on('disconnect', function() {
    console.log("A player has disconnected " + socket.id);
    screen.emit('disconnected', socket.id);
  });
});

// Clients in the screen namespace
var screen = io.of('/screen');
// Listen for output clients to connect
screen.on('connection', function(socket){
  console.log('Screen connected: ' + socket.id);

  socket.on('start', function() {
    console.log('starting game');
    started = true;
  });

  socket.on('switch', function() {
      newRoles.push(newRoles[0])
      newRoles.shift();
      console.log(newRoles);
      playerInputs.emit('switch', newRoles);
  });

  // Listen for this output client to disconnect
  socket.on('disconnect', function() {
    console.log("Screen has disconnected " + socket.id);
  });
});
