import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import socketMiddleware from './middleware/socketMiddleware';
import { updatePlayersList, startGame, turnPlayed, gameOver, gameIsTie } from '../src/actions';
import reducers from './reducers';
import 'semantic-ui-css/semantic.min.css'
import openSocket from 'socket.io-client';
import App from './containers/App';

const socket = openSocket('http://localhost:8080');
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

socket.on('playerConnected', (payload) => {
    store.dispatch(
        updatePlayersList(payload)
    )
});

socket.on('newGame', (payload) => {
    store.dispatch(
        startGame(payload)
    )
});

socket.on('turnPlayed', (payload) => {
    store.dispatch(turnPlayed(payload))
});

socket.on('gameOver', (payload) => {
    store.dispatch(
        gameOver(payload)
    )
  });


socket.on('gameIsTie', (payload) => {
    store.dispatch(
        gameIsTie(payload)
    )
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