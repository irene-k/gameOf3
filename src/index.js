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
let name;

socket.on('welcome', (msg) => {
    console.log('Received', msg);
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.querySelector('#root')
);