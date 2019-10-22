const io = require("socket.io")();

const port = 8080;
io.listen(port);
console.log("listening on port ", port);

const clients = [];
const addClient = client => {
  console.log("New client connected", client.id);

  if (clients.indexOf(client.id) === -1) clients.push(client);
  client.playerCount = clients.length;

  if (client.playerCount % 2 === 0) client.name = "Rick";
  else client.name = "Morty";
};
const removeClient = client => {
  console.log(client.name + " disconnected", client.id);
  delete clients[client.id];
  clients.pop(client);
};

let number = null;
let isGameover = false;
let winner = null;
let isTie = false;

io.on("connection", client => {
  client.on("PLAYER_IS_READY", () => {
    console.log("something came");
    addClient(client);
    client.emit("playerConnected", {
      playerCount: clients.length,
      playerId: client.id,
      player: client.name,
      myTurn: clients.length === 2
    });

    number = Math.floor(Math.random() * 1000);

    if (clients.length === 2)
      io.emit("newGame", {
        current: number,
        playerCount: clients.length
      });
  });

  client.on("PLAY_TURN", turnData => {
    console.log(`got data from client ${client.name}`);
    console.log(`data ${turnData}`);
    const newNumber = parseInt((turnData.current + turnData.control) / 3);
    const data = {
      current: newNumber,
      player: turnData.player,
      myTurn: true
    };
    io.emit("turnPlayed", data);
    if (newNumber === 1) {
      isGameover = true;
      winner = turnData.player;
      io.emit("gameOver", { isGameover, winner });
    } else if (newNumber === 0) {
      isTie = true;
      io.emit("gameIsTie", isTie);
    }
  });

  client.on("disconnect", () => {
    removeClient(client);
    client.broadcast.emit("clientdisconnect", client.id);
  });
});
