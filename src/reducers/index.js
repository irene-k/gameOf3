import { combineReducers } from 'redux';
import { UPDATE_PLAYERS_LIST, NEW_GAME, PLAY_TURN, TURN_PLAYED, GAME_OVER, IS_TIE } from '../actions/types';

const initialState = {
    playerCount: 0,
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
        playerCount: action.payload.playerCount,
        playerId: action.payload.id,
        player: action.payload.player,
        myTurn: action.payload.myTurn
    }
}

const newGame = (state, action) => {
    console.log('newGame: ',action.payload);
    return {
        ...state,
        current: action.payload.current,
        playerCount: action.payload.playerCount
    }
}

const playTurn = (state, action) => ({
    ...state,
    current: action.payload.current,
    player: action.payload.player
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
    isGameOver: action.payload.isGameOver,
    winner: action.payload.winner,
    myTurn: false
})

const isTie = (state, action) => {
    console.log('isTie: ',action.payload);
    return {
        ...state,
        isTie: action.payload,
        myTurn: false
    }
}



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