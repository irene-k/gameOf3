import { PLAYER_IS_READY, UPDATE_PLAYERS_LIST, NEW_GAME, PLAY_TURN, TURN_PLAYED, GAME_OVER, IS_TIE } from './types';

export function playerReady() {
    return { 
        type: PLAYER_IS_READY 
    }
}

export function updatePlayersList(payload) {
    return { 
        type: UPDATE_PLAYERS_LIST, 
        payload 
    }
}

export function startGame(payload) {
    return {
        type: NEW_GAME,
        payload: {
            current: payload.current,
            players: payload.players,
        }
    }
};

export function playTurn(current, control, myTurn) {
    return {
        type: PLAY_TURN,
        payload: {
            current:current,
            control:control,
            myTurn: myTurn
        }
    }
};

export function turnPlayed(payload) {
    return {
        type: TURN_PLAYED,
        payload
    }
};

export function gameOver(payload) {
    return {
    type: GAME_OVER,
    payload
    }
};

export function gameIsTie(payload) {
    return {
    type: IS_TIE,
    payload
    }
};