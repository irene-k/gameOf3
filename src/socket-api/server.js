/**
 * Socket.io
 */
const io = require('socket.io')();

// Config
const port = 8080;
io.listen(port);
console.log('listening on port ', port);

// Store connected clients
const clients = {};

const addClient = client => {
  console.log("New client connected", client.id);
  clients[client.id] = client;
};
const removeClient = client => {
  console.log("Client disconnected", client.id);
  delete clients[client.id];
};

// Match Players
const players = {};
const unmatched = null;
let lastNumber = null;

// Events


io.on('connection', (client) => {

  addClient(client);
  
  client.on("disconnect", () => {
    removeClient(client);
    client.broadcast.emit("clientdisconnect", client.id);
  });

  // Fetch board data
  client.on('getData', (data) => {
    console.log("Getting data server side: " + data)
      if(lastNumber === null)
        lastNumber = Math.floor(Math.random() * 100)
    client.emit('newData', lastNumber);
    
  });
  //Get board state
  /*
  client.on('fetchBoardState', () => {
      response => {
          client.emit('newData', response.data);
      }
  }); */

  //play turn
  client.on('playTurn', (data) => {
    console.log("play turn: " + data)
    lastNumber = data
      client.emit('newData', lastNumber);
    
  });
  //game over
  client.on('gameOver', (data) => {
    response => {
      client.emit('newData', response.data);
    }
  });
});