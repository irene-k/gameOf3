import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import rick from '../assets/rick.jpg'
import morty from '../assets/morty.jpg'
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

    renderWelcome(nbrPlayer){
        const text = nbrPlayer === 0 ? 'Play!' : 'Waiting...';
        return(
            <div className="ui center aligned container welcome">
                <div className="eight wide column centered row">
                    <Button 
                        className="big ui inverted button" 
                        text={text} 
                        onClick={this.props.playerReady}/>
                </div>
            </div>
        );
    }

    renderResults(){

        const fromMe = this.props.playerName === 'Rick'  ? 'fromMe' : '';

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
                            <Button 
                                className="ui button control white-text" 
                                text="-1" 
                                onClick={ () => this.props.playTurn(this.props.current,-1,false)} 
                                disabled={!this.props.myTurn} 
                            />
                            <Button 
                                className="ui button control white-text" 
                                text="0" 
                                onClick={ () => this.props.playTurn(this.props.current,0,false)} 
                                disabled={!this.props.myTurn} 
                            />
                            <Button 
                                className="ui button control white-text" 
                                text="+1" 
                                onClick={ () => this.props.playTurn(this.props.current,1,false)} 
                                disabled={!this.props.myTurn} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    render(){
    const playersCount = this.props.players;
    const turnmsg = this.props.isGameOver && !this.props.myTurn ? 'Game Over! You won!' 
                    :this.props.isGameOver && this.props.myTurn ? 'Game Over! You lost :(' 
                    : this.props.isTie ? `It's a Tie!` 
                    : this.props.myTurn ? 'Your turn!' : `Your opponent's turn!`;
    const avatar = this.props.playerName === 'Rick' ? rick
                    : this.props.playerName === 'Morty' ? morty : '';

    return (
        <div className="main ui container">
            {playersCount <= 1 && this.renderWelcome(playersCount)}
            {playersCount >= 2 && 
                <div>
                    <Header avatar={avatar} 
                            name={this.props.playerName} 
                            turnmsg={turnmsg} 
                    />
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
    playerName: state.gameReducer.playerName,
    myTurn: state.gameReducer.myTurn,
    current: state.gameReducer.current,
    results: state.gameReducer.resultHistory,
    isGameOver: state.gameReducer.isGameOver,
    isTie: state.gameReducer.isTie
})

export default connect(mapStateToProps, { playerReady, startGame, playTurn, turnPlayed, gameOver, gameIsTie })(Board);