import React from 'react';
import { connect } from 'react-redux';
import Button from './Button';
import io from 'socket.io-client';
import { fetchBoardData, playerReady, startGame, playTurn, turnPlayed, gameOver, gameIsTie } from '../actions';

class Board extends React.Component {

    constructor(props) {
        super(props)
        this.socket = io('http://localhost:8080')
    }

    componentDidMount() {
        this.props.startGame();
        this.props.fetchBoardData();
        this.props.turnPlayed();
        this.props.gameOver();
        this.props.gameIsTie();
    }

    renderResults(){

        //const fromMe = !this.props.myTurn ? 'from-me' : '';

        return(
            <div className="ui container results-wrapper">
                <ol className="results">
                    {this.props.results.map((item, index) => 
                        (<li key={index} 
                            className="from-me">
                            {item} 
                        </li>
                        )
                    )}
                    <li id="current">
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
                    onClick={this.props.playerReady} 
                    disabled={!this.props.myTurn} />
                </div>
            </div>
        );
    }
    

    render(){
    const nbrPlayer = this.props.players;
    console.log(nbrPlayer)
    return (
        <div className="main ui container">
            {this.renderResults()}
            {this.renderControls()}


            {/* {nbrPlayer < 1 && this.renderWelcome(nbrPlayer)}
            {nbrPlayer >= 2 && 
                <div>
                {this.renderResults()}
                {this.renderControls()}
                </div>
            } */}
        </div>  
    );
    }  
}

// const mapStateToProps = state => {
//     return { 
//         current: state.gameReducer.current,
//         results: state.gameReducer.resultHistory,
//         myTurn: state.gameReducer.myTurn,
//         isGameOver: state.gameReducer.isGameOver,
//         isTie: state.gameReducer.isTie,
//         players: state.gameReducer.players
//     } 
// };

const mapStateToProps = state => ({ 
    current: state.gameReducer.current,
    results: state.gameReducer.resultHistory,
    myTurn: state.gameReducer.myTurn,
    isGameOver: state.gameReducer.isGameOver,
    isTie: state.gameReducer.isTie,
    players: state.gameReducer.players
})

export default connect(mapStateToProps, { fetchBoardData, playerReady, startGame, playTurn, turnPlayed, gameOver, gameIsTie })(Board);