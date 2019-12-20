import React from "react";
import { connect } from "react-redux";
import Welcome from "../components/Welcome";
import Board from "./Board";
import {
    playerReady
  } from "../actions";


class Main extends React.Component {

    render() {
        const isStarted = this.props.isGameStarted;
        return (
            <div className="main ui container">
              {!isStarted && (
                <Welcome isWaiting={isStarted} onSetPlayerReady={this.props.playerReady} />
              )}
              {isStarted && (
                <Board />
              )}
            </div>
        )
    }

}

const mapStateToProps = store => ({
    isGameStarted: store.gameReducer.isGameStarted
  });
  
export default connect(
  mapStateToProps, {playerReady}
)(Main);