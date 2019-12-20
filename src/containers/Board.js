import React from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import Results from "../components/Results";
import Controls from "../components/Controls";
import rick from "../assets/rick.jpg";
import morty from "../assets/morty.jpg";
import io from "socket.io-client";
import {
    playTurn
  } from "../actions";

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.socket = io("http://localhost:8080");
      }

    getAvatar=() => {
        switch (this.props.player) {
            case "Rick" : return rick;
            case "Morty" : return morty;
            default : return morty;
        }
    }
    
    getGameOverMessage = () => {
        if (this.props.isTie) {
            return `It's a Tie!`;
        }
        if (this.props.winner === this.props.player){
            return "Game Over! You won!";
        }
        else {
            return "Game Over! You lost :(";
        }
        
    }

    getTurnMessage = () => {
        if (this.props.myTurn) {
            return "Your turn!"
        }
        else {
            return `Your opponent's turn!`;
        }
    }

    getResultsClass = () => {
        return this.props.player === "Rick" ? "fromMe" : "";

    }

    handleOnClick = (value) => {
      return () =>
      this.props.playTurn(
        this.props.current,
        value,
        this.props.player,
        false
      )
    }

    getControls = () => {
      return (
        [{
          text:"-1",
          onClick: this.handleOnClick(-1),
        },
        {
          text:"0",
          onClick: this.handleOnClick(0),
        },
        {
          text:"1",
          onClick: this.handleOnClick(1),
        }]
      )
    } 


    render(){
        return (
        <div>
            <Header
              avatar={this.getAvatar()}
              name={this.props.player}
              turnmsg={ !this.props.isGameOver ? this.getTurnMessage() : this.getGameOverMessage()}
            />
             <Results
              resultsArray={this.props.results}
              current={this.props.current}
              className={this.getResultsClass()}
            />
              <Controls
              buttons={this.getControls()}
              disabled={!this.props.myTurn}
            />
           
        </div>
        );
    }
}

const mapStateToProps = state => ({
    myTurn: state.gameReducer.myTurn,
    player: state.gameReducer.player,
    isGameOver: state.gameReducer.isGameOver,
    current: state.gameReducer.current,
    results: state.gameReducer.resultHistory,
    winner: state.gameReducer.winner
  });
  
export default connect(
  mapStateToProps, { playTurn }
)(Board);