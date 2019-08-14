import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newGame, endGame, playTurn } from '../actions'

const Board = (props) => {
    console.log("props", props)


    return (
        <div>
        <div>
            <div className="ui big basic label left-border">{props.current}</div>    
        </div>
        <div className="ui list">
            {props.resultHistory.map((item, index) => (<div className="item"><div className="ui big basic label left-border" key={index}> {item} </div></div>))}
        </div>
        </div>
    );
};

const mapStateToProps = state => {
    return { current: state.gameReducer.current,
        resultHistory: state.gameReducer.resultHistory } 
};

export default connect(mapStateToProps)(Board);

// calculation = (state.response + control.addValue) /3 