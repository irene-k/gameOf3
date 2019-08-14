import React from 'react';
import { connect } from 'react-redux';
import { playTurn } from '../actions';

class Header extends React.Component {

  
    renderTurnMessage(){
        if (this.props.myTurn === true){
            return 'Your turn';
        }
        if (this.props.myTurn === false) {
          return `Your opponent's turn`;
      
        } else {
          return `Waiting for oponent to join...`;
        }
      }
  

    render() {
        return (
        <div>
        <h2 className="ui header has-padding">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj0iOEoQGETZskXdfH6oJVRW38P8O6jbNLGzWjRMR6tO4Qo5WW" className="ui circular image" />
            <div className="content white">
            Morty
                <div id="turnmsg" className="sub header white">{this.renderTurnMessage()}</div>
            </div>
        </h2>
        <div>
        </div>
        </div>
        );
    }
}


const mapStateToProps = state => {
  return { myTurn: state.gameReducer.myTurn } 
};

export default connect(mapStateToProps)(Header);
//waiting for opponent to join as initial message
//message is being updated based on turns during the game
//as soon as 2nd joins its the 1st player's turn
//so 2nd browser gets message it's your opponents turn