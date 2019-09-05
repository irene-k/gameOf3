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

export const playTurn = (current, control, myTurn, resultHistory) => async dispatch => {
    console.log("actions")

    let newValue = parseInt((current + control.addValue) /3)
    socket.emit('playTurn', newValue);

    dispatch ({
        type: PLAY_TURN,
        payload: {
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
        socket.on('newData', (data) => {
            console.log('on new data from turn play:' + data)
            dispatch({
                type: TURN_PLAYED,
                payload: data
            });
        })
    }
}

  export const gameOver = () => {
    return {
        type: GAME_OVER
    }
};
