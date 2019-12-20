import {
  PLAYER_IS_READY,
  UPDATE_PLAYERS_LIST,
  NEW_GAME,
  PLAY_TURN,
  TURN_PLAYED,
  GAME_OVER,
  IS_TIE
} from "./types";

export const playerReady = () => ({
  type: PLAYER_IS_READY
});

export const updatePlayersList = payload => ({
  type: UPDATE_PLAYERS_LIST,
  payload
});

export const startGame = payload => ({
  type: NEW_GAME,
  payload: {
    current: payload.current,
    playerCount: payload.playerCount,
    resultHistory: [payload.current]
  }
});

export const playTurn = (current, control, player, myTurn) => ({
  type: PLAY_TURN,
  payload: {
    current: current,
    control: control,
    player: player,
    myTurn: myTurn
  }
});

export const turnPlayed = payload => ({
  type: TURN_PLAYED,
  payload
});

export const gameOver = payload => ({
  type: GAME_OVER,
  payload: {
    isGameOver: payload.isGameover,
    winner: payload.winner
  }
});

export const gameIsTie = payload => ({
  type: IS_TIE,
  payload
});
