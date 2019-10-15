import { combineReducers } from 'redux';
import { UPDATE_PLAYERS_LIST, NEW_GAME, PLAY_TURN, TURN_PLAYED, GAME_OVER, IS_TIE } from '../actions/types';

const initialState = {
    players: 0,
    myTurn: false,
    current:null,
    resultHistory: [],
    isGameOver: false,
    winner: null,
    isTie: false
}

const updatePlayerList = (state, action) => {
    console.log(action)
    return {
        ...state, 
        players: action.payload.players,
        playerId: action.payload.id,
        playerName: action.payload.playerName,
        myTurn: action.payload.myTurn
    }
}

const newGame = (state, action) => {
    console.log('newGame: ',action.payload);
    return {
        ...state,
        current: action.payload.current,
        players: action.payload.players
    }
}

const playTurn = (state, action) => ({
    ...state,
    current: action.payload.current
})

const turnPlayed = (state, action) => {
    console.log(action)
    return {
        ...state,
        current: action.payload.current,
        resultHistory: [...state.resultHistory, state.current],
        myTurn: !state.myTurn
    }
}

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
        case UPDATE_PLAYERS_LIST:
            return updatePlayerList(state,action);
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