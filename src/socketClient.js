import {
  updatePlayersList,
  startGame,
  turnPlayed,
  gameOver,
  gameIsTie
} from "./actions";

export default function initSocket(socket, store) {
  socket.on("playerConnected", payload => {
    store.dispatch(updatePlayersList(payload));
  });

  socket.on("newGame", payload => {
    store.dispatch(startGame(payload));
  });

  socket.on("turnPlayed", payload => {
    store.dispatch(turnPlayed(payload));
  });

  socket.on("gameOver", payload => {
    store.dispatch(gameOver(payload));
  });

  socket.on("gameIsTie", payload => {
    store.dispatch(gameIsTie(payload));
  });
}
