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

//- - - - arrays
var team1 = [];
var team2 = [];
/*
function Bubble(_dad, _name, _r, _g, _b){
	this.dad = socket.id;
	this.name = name;
	this.r = _r;
	this.g = _g;
	this.b = _b;
}
*/

// - - - - Screen Socket
var screen = io.of('/screen');

screen.on('connection', function (socket) {
		console.log("Screen connected: " + socket.id);
/*
    // Listen for data from this client
		socket.on('data', function(data) {
      // Data can be numbers, strings, objects
			console.log("Received: 'data' " + data);

			// Send it to all clients, including this one
			io.sockets.emit('data', data);

      // Send it to all other clients, not including this one
      //socket.broadcast.emit('data', data);

      // Send it just this client
      // socket.emit('data', data);
		});
*/
    // Listen for this client to disconnect
		socket.on('disconnect', function() {
			console.log("Screen has disconnected " + socket.id);
		});
	});

//- - - - -  Player Sockets
var players = io.of('/players/team1');

players.on('connection',	function (socket){
		console.log('We have a new player: ' + socket.id);
/*
    // Listen for data from this client
		socket.on('data', function(data) {
      // Data can be numbers, strings, objects
			console.log("Received: 'data' " + data);

			// Send it to all clients, including this one
			io.sockets.emit('data', data);

      // Send it to all other clients, not including this one
      //socket.broadcast.emit('data', data);

      // Send it just this client
      // socket.emit('data', data);
		});
*/
    socket.on('team1', function(bubbles){
      team1 = bubbles;
      console.log(team1);
      screen.emit('team1', team1);
      // socket.broadcast.emit('team1', team1);
      console.log('sending to screen');
    });

    socket.on('team2', function(bubbles){
      team2 = bubbles;
      screen.emit('team2', team2);
    });

    // Listen for this client to disconnect
		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	});
