const io = require('socket.io')();

const port = 8080;
io.listen(port);
console.log('listening on port ', port);

const clients = [];
const addClient = client => {
  console.log("New client connected", client.id);

  clients.push(client);
  client.playerNumber = clients.length;

  if (client.playerNumber % 2 === 0)
    client.name = "Rick";
  else
    client.name = "Morty"; 

  console.log( "Player Name: " + client.name + " , number of players: " + client.playerNumber);
  
};
const removeClient = client => {
  console.log(client.name + " disconnected", client.id);
  delete clients[client.id];
  clients.pop(client);
};

let number = null;
let isGameover = false;
let isTie = false;

io.on('connection', (client) => {

  // addClient(client);
  client.on("PLAYER_IS_READY", () => {
    console.log('something came');
    addClient(client);
    client.emit("PLAYER_CONNECTED", {
      id: client.id,
      players: clients.length
      });

      // check if two players are comnected
      // if yes,emit another socket to all players, to start the game with the generated number
      // myTurn is true when the id of the user that coming from the server is the same as the one i have in state
  });
  
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
    else if (turnData === 0){
      isTie = true;
      io.emit('gameIsTie', isTie);
    }
  });

});