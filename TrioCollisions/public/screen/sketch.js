// Open and connect output socket
let socket = io('/screen');

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  // Receive message from server
  socket.on('update', function (data) {
    //console.log(message);

    //just a placeholder
    let id = data.id;
    let pos = data.data;
  });

  //interval timer
  setInterval(switchRoles, 30000); 
  function switchRoles(){
    socket.emit('switch');
  }
}

function draw() {
}
