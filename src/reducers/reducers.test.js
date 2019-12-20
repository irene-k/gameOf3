import { initialState, gameReducer } from './index.js';
import {
    UPDATE_PLAYERS_LIST,
    NEW_GAME,
    PLAY_TURN,
    TURN_PLAYED,
    GAME_OVER,
    IS_TIE
  } from "../actions/types";

  describe("actions", () => {
    describe("updatePlayerList", () => {
        const payload =  { playerCount: 2,
            playerId: 123456789,
            player: 'Rick',
            myTurn:  true} 

        const result = gameReducer(initialState,{type: UPDATE_PLAYERS_LIST, payload: payload})

        it("should return correct playerId", () => {
            const { id, ...rest} = payload;

            expect(result).toEqual({
                ...initialState,
                ...rest,
                playerId: id
                
            })
            
            
        })   
    });

    describe("newGame", () => {
        const payload =  { 
            current: 13,
            playerCount: 2,
            resultHistory: [13]
        } 

        const result = gameReducer(initialState,{type: NEW_GAME, payload: payload})

        it("should return correct state ", () => {
            expect(result).toEqual({
                ...initialState,
                ...payload,
                isGameStarted: true
            }) 
        })   
    });
  })