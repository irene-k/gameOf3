import { FETCH_BOARD_DATA, NEW_GAME, CONTROL_SELECTED, PLAY_TURN, TURN_PLAYED, GAME_OVER } from './types';
import socket from '../socket-api/socket-api';


export const fetchBoardData = () => {
    socket.emit('getData'); 
    return function(dispatch){
        dispatch({
            type: FETCH_BOARD_DATA
        });
    }
}

export const startGame = () => {
    return function(dispatch){
        socket.on('newGame', (data) => {
            dispatch({
                type: NEW_GAME,
                payload: data
            });
        })
    }
}

export const selectControl = control => {
    return {
        type: CONTROL_SELECTED,
        payload: control
    };
};

export const playTurn = (current, control, resultHistory, myTurn, controlsDisabled) => {

    let newValue = parseInt((current + control.addValue) /3)
    let playdata = {control:control,
        current:current,
        next:newValue,
        resultHistory:resultHistory,
        myTurn: myTurn,
        controlsDisabled: controlsDisabled
        }
    socket.emit('playTurn', newValue);

    return function(dispatch){
        dispatch({
        type: PLAY_TURN,
        payload : playdata
        });
    }
}

export const turnPlayed = () => {
    return function(dispatch){
        socket.on('turnPlayed', (playdata) => {
            dispatch({
                type: TURN_PLAYED,
                payload: playdata
            });
        })
    }
}

export const gameOver = () => {
    return function(dispatch){
        socket.on('gameOver', (data) => {
            dispatch({
                type: GAME_OVER,
                payload: data
            });
        })
    }
}