import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import socketMiddleware from './middleware/socketMiddleware';
// import { socket_init } from './socket-api/socket-api';
import reducers from './reducers';
import 'semantic-ui-css/semantic.min.css'
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8080');
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


function updatePlayersList(payload) {
    return {
      type: 'UPDATE_PLAYES_LIST',
      payload
    }
  }

socket.on("PLAYER_CONNECTED", (recievedData) => {
    console.log('i got this -> ', store.dispatch(updatePlayersList(recievedData.players)))
});

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(socketMiddleware(socket),
        reduxThunk))
);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.querySelector('#root')
);