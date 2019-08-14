import { combineReducers } from 'redux';
//import { reducer as formReducer } from 'redux-form';


const initialState = {
    current: Math.floor(Math.random() * 100),
    next:null,
    history: [],
    myTurn: true,
    gameOver: false
}

const controlsReducer = () => {
    return [
        {title:'minus-one', addValue: -1},
        {title:'zero', addValue: 0},
        {title:'plus-one', addValue: 1}
    ];
};

/*
const selectedControlReducer = (selectedControl=null, action) => {
    if (action.type === 'CONTROL_SELECTED') {
        return action.payload
    }
    
    return selectedControl;
};
*/

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_GAME':
            return {...state,
                history:[{
                    cells: new Array(state.grid).fill(null)
                }],
                currentBoard: new Array(state.grid).fill(null),
                showHistory: false,
                stepNumber: 0,
                xTurn: true,
                gameOver: false
            };
            break;
        case 'GAME_OVER':
            return {...state,
                gameOver: true
            };
            break;
        case 'PLAY_TURN':
            console.log("reducer")
            return {...state,
                next: action.payload.next,
                myTurn: !state.myTurn,
                current: action.payload.next,
                //pastResults: pastResults.fill(action.payload.next),
                //history: action.history.concat([{
                //    cells: action.cells
                //}]),
                //currentBoard: action.cells,
                gameOver: false,
            };
            break;
        default:
            return state;
    }
};

/*
const boardStateReducer = (state=initialState, action) => {
    if (action.type === 'BOARD_STATE') {
        return action.payload
    }
    
    return state;
};
*/

/*
const turnmsgReducer = () => {
    return [
        {msg:'Your turn'},
        {msg:`Your opponent's turn`}
    ]
}

const displayTurnmsgReducer = (turnmsg=`Waiting for opponent to join...`, action) => {
    if (action.type === 'TURN_MESSAGE') {
        return action.payload
    }
    
    return turnmsg;
};
*/

// introduce activePlayer? activePlayer="Rick" nextPlayer=" "

/*
const playTurnReducer = (state=initialState, action) => {
    if (action.type === 'PLAY_TURN') {
        console.log("reducer")
        return {...state,
            //current: action.payload.current,
            next: action.payload.next,
            myTurn: !state.myTurn,
            current: action.payload.next
        };  
    }
    return state;
}
*/


export default combineReducers({
    gameReducer,
    //current: boardStateReducer,
    controls: controlsReducer
    //selected: selectedControlReducer,
    //playTurn: playTurnReducer,
})