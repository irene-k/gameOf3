import React from 'react';
import { connect } from 'react-redux';
import Button from './Button';
import io from 'socket.io-client';
import { playerReady, startGame, playTurn, turnPlayed, gameOver, gameIsTie } from '../actions';

class Board extends React.Component {

    constructor(props) {
        super(props)
        this.socket = io('http://localhost:8080')
    }

    componentDidMount() {
    }

    renderResults(){

        const fromMe = this.props.players ===2 ? 'fromMe' : '';

        return(
            <div className="ui container results-wrapper">
                <ol className="results">
                    {this.props.results.map((item, index) => 
                        (<li key={index} 
                            className={` ${fromMe}`}>
                            {item} 
                        </li>
                        )
                    )}
                    <li id="current" className={` ${fromMe}`}>
                        {this.props.current}
                    </li>
                </ol> 
            </div>
        );
    }

    renderControls(){
        const hideControls = this.props.isGameOver || this.props.isTie  ? 'hideControls' : '';

        return(
            <div className="ui vertical footer segment ">
                <div className="ui center aligned container">
                    <div className="ui stackable grid">
                        <div className={`eight wide column centered row ${hideControls}`}>
                            <Button className="ui button control white-text" text="-1" onClick={ () => this.props.playTurn(this.props.current,-1,false)} disabled={!this.props.myTurn} />
                            <Button className="ui button control white-text" text="0" onClick={ () => this.props.playTurn(this.props.current,0,false)} disabled={!this.props.myTurn} />
                            <Button className="ui button control white-text" text="+1" onClick={ () => this.props.playTurn(this.props.current,1,false)} disabled={!this.props.myTurn} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    renderWelcome(nbrPlayer){
        const text = nbrPlayer === 0 ? 'Join!' : 'Waiting...';
        return(
            <div className="ui center aligned container">
                <div className="eight wide column centered row">
                    <Button 
                    className="ui button white-text" 
                    text={text} 
                    onClick={this.props.playerReady}/>
                </div>
            </div>
        );
    }
    

    render(){
    const nbrPlayer = this.props.players;
    console.log(nbrPlayer)
    return (
        <div className="main ui container">
            {/* {this.renderResults()}
            {this.renderControls()} */}


            {nbrPlayer < 1 && this.renderWelcome(nbrPlayer)}
            {nbrPlayer >= 2 && 
                <div>
                {this.renderResults()}
                {this.renderControls()}
                </div>
            }
        </div>  
    );
    }  
}

const mapStateToProps = state => ({ 
    players: state.gameReducer.players,
    myTurn: state.gameReducer.myTurn,
    current: state.gameReducer.current,
    results: state.gameReducer.resultHistory,
    isGameOver: state.gameReducer.isGameOver,
    isTie: state.gameReducer.isTie
})

export default connect(mapStateToProps, { playerReady, startGame, playTurn, turnPlayed, gameOver, gameIsTie })(Board);