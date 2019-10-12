import { combineReducers } from 'redux';
import { UPDATE_PLAYES_LIST, FETCH_BOARD_DATA, NEW_GAME, PLAY_TURN, TURN_PLAYED, GAME_OVER, IS_TIE } from '../actions/types';

const initialState = {
    players: 0,
    next:null,
    resultHistory: [],
    myTurn: true,
    isGameOver: false,
    isTie: false
}

const updatePlayerList = (state, action) => ({
    ...state, 
    players: action.payload
})

const fetchBoardData = (state, action) => ({
    ...state
})

const newGame = (state, action) => ({
    ...state,
    current: action.payload
})

const playTurn = (state, action) => ({
    ...state,
    current: action.payload.next,
    next: action.payload.next,
    resultHistory: [...state.resultHistory, state.current],
    myTurn: !state.myTurn
})

const turnPlayed = (state, action) => ({
    ...state,
    current: action.payload,
    next: action.payload.next,
    resultHistory: [...state.resultHistory, state.current],
    myTurn: true
})

const gameOver = (state, action) => ({
    ...state,
    isGameOver: action.payload
})

const isTie = (state, action) => ({
    ...state,
    isTie: action.payload
})

const gameReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case UPDATE_PLAYES_LIST:
            return updatePlayerList(state,action);
        case FETCH_BOARD_DATA:
            return fetchBoardData(state,action);
        case NEW_GAME:
            return newGame(state,action);
        case PLAY_TURN:
            return playTurn(state,action);
        case TURN_PLAYED:
            return turnPlayed(state,action);
        case GAME_OVER:
            return gameOver(state,action);
        case IS_TIE:
            return isTie(state,action);
        default:
            return state;
    }
};

export default combineReducers({
    gameReducer
})