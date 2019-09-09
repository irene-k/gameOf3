import { combineReducers } from 'redux';

const initialState = {
    //current: Math.floor(Math.random() * 100),
    next:null,
    myTurn: true,
    resultHistory: [],
    gameOver: false 
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
        case 'FETCH_BOARD_DATA':
                console.log("Fetch board data")
                return {
                    ...state
                };
                break;
        case 'NEW_DATA':
            console.log("new data")
            return {
                ...state,
                current: action.payload            
            };
            break;
        case 'PLAY_TURN':
            console.log("reducer")
            return {...state,
                current: action.payload.next,
                next: action.payload.next,
                resultHistory: [...state.resultHistory, state.current],
                myTurn: !state.myTurn,
                gameOver: false
            };
            break;
        case 'TURN_PLAYED':
            console.log("turn played reducer")
            return {...state
            };
            break;
        case 'GAME_OVER':
            return {
                ...state
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