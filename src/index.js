import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
);

const io = require('socket.io-client');

let socket = io.connect('http://localhost:8080');

const players = {};
let unmatched;

function joinGame(socket) {
  // Add the player to our object of players
  players[socket.id] = {
    // The opponent will either be the socket that is
    // currently unmatched, or it will be null if no
    // players are unmatched
    opponent: unmatched,

    // The symbol will become 'O' if the player is unmatched
    symbol: "X",

    // The socket that is associated with this player
    socket: socket
  };

  // Every other player is marked as 'unmatched', which means
  // there is not another player to pair them with yet. As soon
  // as the next socket joins, the unmatched player is paired with
  // the new socket and the unmatched variable is set back to null
  if (unmatched) {
    players[socket.id].symbol = "O";
    players[unmatched].opponent = socket.id;
    unmatched = null;
  } else {
    unmatched = socket.id;
  }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.querySelector('#root')
);