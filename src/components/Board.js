import React from 'react';
import { connect } from 'react-redux';
import { newGame, endGame, playTurn } from '../actions'

const Board = (props) => {
    console.log("props", props)


    return (
        <div>
            <div className="ui big basic label left-border">{props.current}</div>            
        </div>
    );
};

const mapStateToProps = state => {
    return { current: state.gameReducer.current } 
};

export default connect(mapStateToProps)(Board);

// calculation = (state.response + control.addValue) /3 