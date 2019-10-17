import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import rick from '../assets/rick.jpg';
import morty from '../assets/morty.jpg';
import logo from '../assets/logo.png';
import Button from '../components/Button';
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
            <div className='ui center aligned container welcome'>
                <div>
                    <img src={logo} className='logo'></img>
                </div>
                <div className='eight wide column centered row'>
                    <Button 
                        className='large ui inverted button' 
                        text={text} 
                        onClick={this.props.playerReady}/>
                </div>
            </div>
        );
    }

    renderResults(){

        const fromMe = this.props.player === 'Rick'  ? 'fromMe' : '';

        return(
            <div className='ui container results-wrapper'>
                <ol className='results'>
                    {this.props.results.map((item, index) => 
                        (<li key={index} 
                            className={` ${fromMe}`}>
                            {item} 
                        </li>
                        )
                    )}
                    <li id='current' className={` ${fromMe}`}>
                        {this.props.current}
                    </li>
                </ol> 
            </div>
        );
    }

    renderControls(){
        return(
            <div className='ui vertical footer segment '>
                <div className='ui center aligned container'>
                    <div className='ui stackable grid'>
                        <div className={'eight wide column centered row'}>
                            <Button 
                                className='ui button control white-text' 
                                text='-1' 
                                onClick={ () => this.props.playTurn(this.props.current,-1,this.props.player,false)} 
                                disabled={!this.props.myTurn} 
                            />
                            <Button 
                                className='ui button control white-text' 
                                text='0' 
                                onClick={ () => this.props.playTurn(this.props.current,0,this.props.player,false)} 
                                disabled={!this.props.myTurn} 
                            />
                            <Button 
                                className='ui button control white-text' 
                                text='+1' 
                                onClick={ () => this.props.playTurn(this.props.current,1,this.props.player,false)} 
                                disabled={!this.props.myTurn} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    render(){
    const playerCount = this.props.playerCount;
    const turnmsg = this.props.isGameOver && this.props.winner === this.props.player ? 'Game Over! You won!' 
                    :this.props.isGameOver && this.props.winner !== this.props.player ? 'Game Over! You lost :(' 
                    : this.props.isTie ? `It's a Tie!` 
                    : this.props.myTurn ? 'Your turn!' : `Your opponent's turn!`;
    const avatar = this.props.player === 'Rick' ? rick
                    : this.props.player === 'Morty' ? morty : '';

    return (
        <div className='main ui container'>
            {playerCount <= 1 && this.renderWelcome(playerCount)}
            {playerCount >= 2 && 
                <div>
                    <Header avatar={avatar} 
                            name={this.props.player} 
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
    playerCount: state.gameReducer.playerCount,
    player: state.gameReducer.player,
    myTurn: state.gameReducer.myTurn,
    current: state.gameReducer.current,
    results: state.gameReducer.resultHistory,
    isGameOver: state.gameReducer.isGameOver,
    winner: state.gameReducer.winner,
    isTie: state.gameReducer.isTie
})

export default connect(mapStateToProps, { playerReady, startGame, playTurn, turnPlayed, gameOver, gameIsTie })(Board);