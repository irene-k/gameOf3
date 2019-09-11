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

// Events
let number = null;
let isGameover = false;

io.on('connection', (client) => {

  addClient(client);
  
  client.on("disconnect", () => {
    removeClient(client);
    client.broadcast.emit("clientdisconnect", client.id);
  });

  // Fetch board data
  client.on('getData', () => {
    console.log("Getting data server side")
      if(number === null)
        number = Math.floor(Math.random() * 100);
      client.emit('newGame', number);

  });

   client.on('playTurn', (turnData) => {
    client.broadcast.emit('turnPlayed', turnData);
      console.log('Play turn Data:' + turnData)
      if (turnData === 1){
        isGameover = true;
        client.emit('gameOver', isGameover);
      }
  });

});