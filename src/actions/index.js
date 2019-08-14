// or make move - MOVE_MADE
// return active player - next player
// active player -> myTurn: true


// get the latest result
export const boardState = current => {
    return {
        type: 'BOARD_STATE',
        payload : current
    };
}

export const selectControl = control => {
    return {
        type: 'CONTROL_SELECTED',
        payload: control
    };
};

export const displayTurnMessage = turnmsg => {
    return {
        type: 'TURN_MESSAGE',
        payload: turnmsg
    };
};

export const newGame = () => {
    return {
        type: 'NEW_GAME'
    }
};
export const endGame = () => {
    return {
        type: 'GAE_OVER'
    }
};

// turn involves current, selectedcontrol and next
export const playTurn = (current, control, myTurn) => async dispatch => {
    console.log("actions")
    console.log("current" + current)
    console.log('control' + control.addValue);

    dispatch ({
        type: 'PLAY_TURN',
        payload: {
            control:control,
            current:current,
            next:parseInt((current + control.addValue) /3),
            myTurn: myTurn
        }
    });
};

// create for turn, check if win

