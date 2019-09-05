import React from 'react';
import Header from './Header';
import style from './style.css';
import Controls from './Controls';
import Board from './Board'

class App extends React.Component {

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

