import { FETCH_BOARD_DATA, NEW_DATA, CONTROL_SELECTED, PLAY_TURN, TURN_PLAYED, GAME_OVER } from './types';
import socket from '../socket-api/socket-api';


export function fetchBoardData(){
    socket.emit('getData'); 
    return function(dispatch){
        dispatch({
            type: FETCH_BOARD_DATA
        });
    }
}

export function subscribeNewData(){
    return function(dispatch){
        socket.on('newData', (data) => {
            console.log('on new data subscriber:' + data)
            dispatch({
                type: NEW_DATA,
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

export const playTurn = (current, control, myTurn, resultHistory) => {
    console.log("play turn action")

    let newValue = parseInt((current + control.addValue) /3)
    socket.emit('playTurn', newValue);

    return ({
        type: PLAY_TURN,
        payload : {
            control:control,
            current:current,
            next:newValue,
            myTurn: myTurn,
            resultHistory:resultHistory
        }
    });
};

export function turnPlayed(){
    return function(dispatch){
        socket.on('turnPlayed', (turnData) => {
            console.log('on turn played subscriber:' + turnData)
            dispatch({
                type: TURN_PLAYED,
                payload: turnData
            });
        })
    }
}

  export const gameOver = () => {
    return {
        type: GAME_OVER
    }
};
