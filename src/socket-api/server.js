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

  client.on('PLAYER_IS_READY', () => {
    console.log('something came');
    addClient(client);
    client.emit('playerConnected', {
      id: client.id,
      myTurn: clients.length === 2,
      players: clients.length
      });


    number = Math.floor(Math.random() * 100);

    if (clients.length === 2)
      io.emit('newGame', {
        current: number,
        players: clients.length,
      });
  });

  client.on('PLAY_TURN', (turnData) => {
    console.log(`got data from client ${client.id}`)
    console.log(`data ${turnData}`)
    const newNumber = parseInt((turnData.current + turnData.control) /3);
    const data = { 
      current: newNumber,
      next: newNumber,
      myTurn: true      
    }

    io.emit('turnPlayed', data);
    if (newNumber === 1){
      isGameover = true;
      io.emit('gameOver', isGameover);
    }
    else if (newNumber === 0){
      isTie = true;
      io.emit('gameIsTie', isTie);
    }
  });
  
  client.on("disconnect", () => {
    removeClient(client);
    client.broadcast.emit("clientdisconnect", client.id);
  });

});