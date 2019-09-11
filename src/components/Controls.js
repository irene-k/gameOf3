import React from 'react';
import { connect } from 'react-redux';
import { playTurn, turnPlayed, gameOver } from '../actions'

class Controls extends React.Component {

    componentDidMount() {
        this.props.turnPlayed();
        this.props.gameOver();
    }

    renderControls(){
       if(!this.props.isGameOver){
       return this.props.controls.map((control) => {
           return (
                   <button key={control.title} className="circular ui button fixed-ratio scoober-blue white" 
                    onClick={() => this.props.playTurn(this.props.current, control)}
                    >
                        {control.addValue} 
                    </button>
           );   
       });
    }
    }
    
    render() {
        return (
            <div className="controls">{this.renderControls()}</div>
        );
    }
}

const mapStateToProps = state => { 
    return { controls: state.controls,
            current: state.gameReducer.current,
            myTurn: state.gameReducer.myTurn,
            controlsDisabled: state.gameReducer.controlsDisabled,
            isGameOver: state.gameReducer.isGameOver
    };
};

export default connect(mapStateToProps,{ playTurn, turnPlayed, gameOver })(Controls);

//disabled={this.props.controlsDisabled}