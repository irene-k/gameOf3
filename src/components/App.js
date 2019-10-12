import React from 'react';
import Header from './Header';
import Board from './Board'
import styles from './styles.css';

const App = () => {

  return( 
  <div className="ui container body-bg">
    <Header />
    <Board />
  </div>
  ); 
}

export default App;