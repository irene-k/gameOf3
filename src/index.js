import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import socketMiddleware from "./middleware/socketMiddleware";
import reducers from "./reducers";
import "semantic-ui-css/semantic.min.css";
import openSocket from "socket.io-client";
import App from "./components/App";
import initSocket from "./socketClient";

const socket = openSocket("http://localhost:8080");
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(socketMiddleware(socket), reduxThunk))
);

initSocket(socket, store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
