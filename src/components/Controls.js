import React from 'react';
import { connect } from 'react-redux';
import { newGame, endGame, playTurn } from '../actions'

class Controls extends React.Component {
    renderControls(){
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
    
    render() {
        return (
            <div className="controls">{this.renderControls()}</div>
        );
    }
}

const mapStateToProps = state => { 
    console.log("state")
    console.log(state)
    return { controls: state.controls,
            current: state.gameReducer.current,
            myTurn: state.gameReducer.myTurn };
};

export default connect(mapStateToProps,{ playTurn })(Controls);