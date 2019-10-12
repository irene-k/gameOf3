import { FETCH_BOARD_DATA, PLAYER_IS_READY, NEW_GAME, PLAY_TURN, TURN_PLAYED, GAME_OVER, IS_TIE } from '../actions/types';

export default socket => store => next => action => {
  
  if (action.type && action.type === FETCH_BOARD_DATA) {
    console.log("FETCH_BOARD_DATA");
    socket.emit(FETCH_BOARD_DATA, action.type);
  }  
  
  if (action.type && action.type === PLAYER_IS_READY) {
    console.log("PLAYER_IS_READY");
    socket.emit(PLAYER_IS_READY, action.type);
  }

  if (action.type && action.type === NEW_GAME) {
    console.log("NEW_GAME");
    socket.emit(NEW_GAME, action.type);
  }

  if (action.type && action.type === PLAY_TURN) {
    console.log(PLAY_TURN);
    socket.emit(PLAY_TURN, action.type);
  }

  if (action.type && action.type === TURN_PLAYED) {
    console.log(TURN_PLAYED);
    socket.emit(TURN_PLAYED, action.type);
  }

  if (action.type && action.type === GAME_OVER) {
    console.log(GAME_OVER);
    socket.emit(GAME_OVER, action.type);
  }
  
  if (action.type && action.type === IS_TIE) {
    console.log(IS_TIE);
    socket.emit(IS_TIE, action.type);
  }

  return next(action);
  
  };