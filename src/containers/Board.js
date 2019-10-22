import React from "react";
import { connect } from "react-redux";
import Welcome from "../components/Welcome";
import Header from "../components/Header";
import Controls from "../components/Controls";
import Results from "../components/Results";
import rick from "../assets/rick.jpg";
import morty from "../assets/morty.jpg";
import io from "socket.io-client";
import {
  playerReady,
  startGame,
  playTurn,
  turnPlayed,
  gameOver,
  gameIsTie
} from "../actions";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io("http://localhost:8080");
  }

  render() {
    const playerCount = this.props.playerCount;
    const welcomeBtnText = playerCount === 0 ? "Play!" : "Waiting...";
    const turnmsg =
      this.props.isGameOver && this.props.winner === this.props.player
        ? "Game Over! You won!"
        : this.props.isGameOver && this.props.winner !== this.props.player
        ? "Game Over! You lost :("
        : this.props.isTie
        ? `It's a Tie!`
        : this.props.myTurn
        ? "Your turn!"
        : `Your opponent's turn!`;
    const avatar =
      this.props.player === "Rick"
        ? rick
        : this.props.player === "Morty"
        ? morty
        : "";
    const fromMe = this.props.player === "Rick" ? "fromMe" : "";

    return (
      <div className="main ui container">
        {playerCount <= 1 && (
          <Welcome text={welcomeBtnText} onClick={this.props.playerReady} />
        )}
        {playerCount >= 2 && (
          <div>
            <Header
              avatar={avatar}
              name={this.props.player}
              turnmsg={turnmsg}
            />
            <Results
              resultsArray={this.props.results}
              current={this.props.current}
              className={` ${fromMe}`}
            />
            <Controls
              text1="-1"
              text2="0"
              text3="+1"
              className="ui button control white-text"
              onClick1={() =>
                this.props.playTurn(
                  this.props.current,
                  -1,
                  this.props.player,
                  false
                )
              }
              onClick2={() =>
                this.props.playTurn(
                  this.props.current,
                  0,
                  this.props.player,
                  false
                )
              }
              onClick3={() =>
                this.props.playTurn(
                  this.props.current,
                  1,
                  this.props.player,
                  false
                )
              }
              disabled={!this.props.myTurn}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playerCount: state.gameReducer.playerCount,
  player: state.gameReducer.player,
  myTurn: state.gameReducer.myTurn,
  current: state.gameReducer.current,
  results: state.gameReducer.resultHistory,
  isGameOver: state.gameReducer.isGameOver,
  winner: state.gameReducer.winner,
  isTie: state.gameReducer.isTie
});

export default connect(
  mapStateToProps,
  { playerReady, startGame, playTurn, turnPlayed, gameOver, gameIsTie }
)(Board);
