import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client'
import { fetchBoardData, playTurn, turnPlayed, subscribeNewData } from '../actions'

class Board extends React.Component {


    constructor(props) {
        super(props)
    
        this.socket = io('http://localhost:8080')
      }

    componentDidMount() {
        this.props.subscribeNewData();
        this.props.fetchBoardData();
        //this.props.turnPlayed();
    } 
    
    render(){
    return (
        <div>
            <div className="ui list">
                {this.props.results.map((item, index) => (<div key={index} className="item"><div className="ui big basic label left-border" key={index}> {item} </div></div>))}
            </div>
            <div id="current" className="ui big basic label left-border">{this.props.current}</div>
        </div>
    );
    }


    
    
}

const mapStateToProps = state => {
    return { 
        current: state.gameReducer.current,
        results: state.gameReducer.resultHistory } 
};

export default connect(mapStateToProps, { fetchBoardData, subscribeNewData, playTurn, turnPlayed })(Board);