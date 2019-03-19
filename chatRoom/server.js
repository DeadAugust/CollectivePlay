// basic server definitions
// specifies either the default port or 8000 (on localhost?)
let port = process.env.PORT || 8000;
// allows use of the express library
let express = require('express');
// defines an instance of the express library thingy
let app = express();
// sets up the server with http, express, port
let server = require('http').createServer(app).listen(port, function () {
  console.log('Server listening at port: ', port);
});

// tells the app where the files they need to serve to clients are
app.use(express.static('public'));

// starts an instance of the socketio library thingy, directed to the port from the earlier server
let io = require('socket.io').listen(server);

//according to https://socket.io/docs/rooms-and-namespaces/
// not sure what adapter is, since we're not using redis?
// but I get that this is supposed to be a running list of all rooms
let rooms = io.sockets.adapter.rooms;
let roomNum = 0;
//number of users that are in each room
let numPartners = 2;

//regular input set up
io.sockets.on('connection', function (socket) {
  console.log('An input client connected: ' + socket.id);

  //doesn't this already happen? it's in a room defined by its default id?
  //oh wait, this is a new function that I will explain below
  joinRoom(socket);

  //sends whatever text is received on the text event to the room from which it came (to the other user)
  socket.on('text', function (data) {

    let room = socket.room;

    socket.to(room).emit('text', data);
  });

  socket.on('disconnect', function () {
    console.log("Client has disconnected " + socket.id);


    let room = socket.room;
    //lets the other person in the room know they left
    if (rooms[room]) {
      socket.to(room).emit('leave room');
    }
  });
});


function joinRoom(socket) {

//ahhh got it, so each "room" is an array of the socket ids of its occupants
//if you find a room with 0 or 1 users, you join it.
  for (let r in rooms) {
    let room = rooms[r];
    if (room.isPrivate) {
      if (room.length < numPartners) {
        addSocketToRoom(socket, r);
        return;
      }
    }
  }

  //so this is only if there are no rooms? since roomNum is 0? hmm....
  addSocketToRoom(socket, roomNum);
  //ahh, and it'll repeat and create new rooms in the case that the only rooms that exist have 2 people already?
  // oh because this is server, so roomNum is globalllllll duh
  roomNum++;
}
//so this is the actual function that adds the socket to the room
function addSocketToRoom(socket, r) {
  socket.join(r);
  //this is an arbitrary toggle, just to "open the room" ironically (i think?)
  //does this actually do anything in this sketch? because it doesn't matter if room is "private" since it'll only join...
  // unless this has something to do with the adapter.rooms (like maybe there are more rooms than is good? like everyone would start on own room and get stuck there)
  rooms[r].isPrivate = true;
  socket.room = r;
}
