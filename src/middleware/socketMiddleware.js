import { PLAYER_IS_READY, PLAY_TURN } from '../actions/types';

export default socket => store => next => action => {
  
  if (action.type && action.type === PLAYER_IS_READY) {
    socket.emit(PLAYER_IS_READY, action.type);
  }

  if (action.type && action.type === PLAY_TURN) {
    socket.emit(PLAY_TURN, action.payload);
  }

  return next(action);
};