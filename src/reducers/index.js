import { combineReducers } from 'redux';

const initialState = {
    /*
    //current: Math.floor(Math.random() * 100),
    next:null,
    myTurn: true,
    resultHistory: [],
    gameOver: false */
    current: null,
    resultHistory: []

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
                    ...state,
                };
                break;
        case 'NEW_DATA':
            console.log("new data")
            return {
                ...state,
                current: action.payload
            };
            break;
        case 'GET_BOARD_STATE':
            console.log("board state")
            return {
                ...state
            };
            break;
        case 'PLAY_TURN':
            console.log("reducer")
            return {...state,
                next: action.payload.next,
                myTurn: !state.myTurn,
                current: action.payload.next,
                //current: [...state.resultHistory].pop(),
                resultHistory: [...state.resultHistory, state.current],
                gameOver: false
            };
            break;
        case 'TURN_PLAYED':
            console.log("turn played reducer")
            return {...state,
                resultHistory: action.payload
            };
            break;
        case 'GAME_OVER':
            return {
                ...state,
                gaeOver:true
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