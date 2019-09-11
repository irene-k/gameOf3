const io = require('socket.io')();

const port = 8080;
io.listen(port);
console.log('listening on port ', port);

const clients = {};

const addClient = client => {
  console.log("New client connected", client.id);
  clients[client.id] = client;
};
const removeClient = client => {
  console.log("Client disconnected", client.id);
  delete clients[client.id];
};

let number = null;
let isGameover = false;

io.on('connection', (client) => {

  addClient(client);
  
  client.on("disconnect", () => {
    removeClient(client);
    client.broadcast.emit("clientdisconnect", client.id);
  });

  client.on('getData', () => {
      if(number === null)
        number = Math.floor(Math.random() * 100);
      client.emit('newGame', number);

  });

   client.on('playTurn', (turnData) => {
    client.broadcast.emit('turnPlayed', turnData);
    if (turnData === 1){
      isGameover = true;
      io.emit('gameOver', isGameover);
    }
  });

});