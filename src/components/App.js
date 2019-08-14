import React from 'react';
import socketIOClient from 'socket.io-client';
import Header from './Header';
import style from './style.css';
import Controls from './Controls';
import Board from './Board'

class App extends React.Component {


componentDidMount() {
    //Very simply connect to the socket
    //const socket = socketIOClient('localhost:8080');
    //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
    //socket.on("outgoing data", data => this.setState({response: data.num}));
}

render() {
  return( 
  <div className="ui container">
    <div className="eight wide column centered row scoober-blue">
      <Header />
    </div>
    <div className="main ui container">
      <Board />
    </div>
    <div className="ui  vertical footer segment">
        <div className="ui center aligned container">
          <div className="ui stackable inverted grid">
            <div className="eight wide column centered row ">
              <Controls />
            </div>
          </div>
        </div>
    </div>    
  </div>
  );
}

}

export default App;

