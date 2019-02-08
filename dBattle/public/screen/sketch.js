// SCREEN
// Open and connect socket
let socket = io('/screen');

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
}
