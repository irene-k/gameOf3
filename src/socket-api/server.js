/**
 * Socket.io
 */
const io = require('socket.io')();

// Config
const port = 8080;
io.listen(port);
console.log('listening on port ', port);

// Store connected clients
const clientss = {};

const addClient = client => {
  console.log("New client connected", client.id);
  clientss[client.id] = client;
};
const removeClient = client => {
  console.log("Client disconnected", client.id);
  delete clientss[client.id];
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
  client.on('getData', () => {
    console.log("Getting data server side")
      if(lastNumber === null)
        lastNumber = Math.floor(Math.random() * 100);
      client.emit('newData', lastNumber);
    //getOpponent and emmit
  });


   client.on('playTurn', (turnData) => {
    client.broadcast.emit('turnPlayed', turnData);
      console.log('Play turn Data:' + turnData)
  });

  /*
  client.on('turnPlayed', () => {
    console.log("Getting Turn data server side")
    client.emit('newData', data);
  }); */

  //game over
  client.on('gameOver', (data) => {
    response => {
      client.emit('newData', response.data);
    }
  });
});