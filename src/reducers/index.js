import { combineReducers } from "redux";
import {
  UPDATE_PLAYERS_LIST,
  NEW_GAME,
  PLAY_TURN,
  TURN_PLAYED,
  GAME_OVER,
  IS_TIE
} from "../actions/types";

export const initialState = {
  playerCount: 0,
  isGameStarted:false,
  myTurn: false,
  current: null,
  resultHistory: [],
  isGameOver: false,
  winner: null,
  isTie: false,
};

export const updatePlayerList = (state, action) => {
  const { id, ...rest} = action.payload;

return {
    ...state,
    ...rest,
    playerId: id
  }
};

export const newGame = (state, action) => ({
  ...state,
  ...action.payload,
  isGameStarted: true,
  resultHistory: [action.payload.current]
});


export const playTurn = (state, action) => ({  
  ...state,
  ...action.payload
});

export const turnPlayed = (state, action) => ({
  ...state,
  current: action.payload.current,
  resultHistory: [...state.resultHistory, action.payload.current],
  myTurn: action.payload.player !== state.player
});

export const gameOver = (state, action) => ({
  ...state,
  ...action.payload,
});

export const isTie = (state, action) => ({
  ...state,
  isTie: action.payload
});

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLAYERS_LIST:
      return updatePlayerList(state, action);
    case NEW_GAME:
      return newGame(state, action);
    case PLAY_TURN:
      return playTurn(state, action);
    case TURN_PLAYED:
      return turnPlayed(state, action);
    case GAME_OVER:
      return gameOver(state, action);
    case IS_TIE:
      return isTie(state, action);
    default:
      return state;
  }
};

export default combineReducers({
  gameReducer
});
