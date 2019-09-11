import { combineReducers } from 'redux';
import { FETCH_BOARD_DATA, NEW_GAME, PLAY_TURN, TURN_PLAYED, GAME_OVER } from '../actions/types';

const initialState = {
    next:null,
    resultHistory: [],
    myTurn: true,
    controlsDisabled: false,
    isGameOver: false
}

const controlsReducer = () => {
    return [
        {title:'minus-one', addValue: -1},
        {title:'zero', addValue: 0},
        {title:'plus-one', addValue: 1}
    ];
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOARD_DATA:
            console.log("Fetch board data")
            return {
                ...state
            };
            break;
        case NEW_GAME:
            console.log("new game")
            return {
                ...state,
                current: action.payload            
            };
            break;
        case PLAY_TURN:
            console.log("reducer")
            return {...state,
                current: action.payload.next,
                resultHistory: [...state.resultHistory, state.current],
                myTurn: !state.myTurn,
                controlsDisabled: !state.controlsDisabled,
                };
            break;
        case TURN_PLAYED:
            console.log("turn played reducer")
            return {...state,
                current: action.payload,            
                resultHistory: [...state.resultHistory, state.current],
            };
            break;
        case GAME_OVER:
            return {
                ...state,
                isGameOver: action.payload            
            };
            break;
        default:
            return state;
    }
};

export default combineReducers({
    controls: controlsReducer,
    gameReducer
})