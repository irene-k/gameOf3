import { FETCH_BOARD_DATA, PLAYER_IS_READY, NEW_GAME, PLAY_TURN, TURN_PLAYED, GAME_OVER, IS_TIE } from './types';
import socket from '../socket-api/socket-api';

// export function fetchingBoardData() {
//     return { type: FETCH_BOARD_DATA }
// }

// export function playerIsReady() {
//     return { type: PLAYER_IS_READY }
// }

// export function newGame(data) {
//     return { type: NEW_GAME, data }
// }

// export function playingTurn(current, control, myTurn) {
//     return { type: PLAY_TURN, playdata }
// }

// export function turnIsPlayed(playdata) {
//     return { type: TURN_PLAYED, playdata }
// }

// export function gameIsOver(gata) {
//     return { type: GAME_OVER, data }
// }

// export function gameIsTie(data) {
//     return { type: IS_TIE, data }
// }

  
export const fetchBoardData = () => {
    socket.emit('getData'); 
    return function(dispatch){
        dispatch({
            type: FETCH_BOARD_DATA
        });
    }
}

export const playerReady = () => {
    //socket.emit('getData'); 
    return function(dispatch){
        dispatch({
            type: PLAYER_IS_READY
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

export const playTurn = (current, control, myTurn) => {

    let newValue = parseInt((current + control) /3);
    let resultHistory;
    let playdata = {
        current:current,
        control:control,
        next:newValue,
        resultHistory:resultHistory,
        myTurn: myTurn,
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

export const gameIsTie = () => {
    return function(dispatch){
        socket.on('gameIsTie', (data) => {
            dispatch({
                type: IS_TIE,
                payload: data
            });
        })
    }
}