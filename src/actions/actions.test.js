import { playerReady, updatePlayersList, playTurn, turnPlayed, gameOver, gameIsTie} from './index.js'
import {
    PLAYER_IS_READY,
    UPDATE_PLAYERS_LIST,
    NEW_GAME,
    PLAY_TURN,
    TURN_PLAYED,
    GAME_OVER,
    IS_TIE
  } from "./types";

describe("actions", () => {
    describe("playerReady", () => {
        it("should return PLAYER_IS_READY type", () => {
            expect(playerReady()).toEqual({
                type: PLAYER_IS_READY
            })
        })   
    });
    describe("updatePlayersList", () => {
        const result = updatePlayersList({
            playerCount: 2,
            playerId: 123456789,
            player: 'Rick',
            myTurn:  true
        })
        it("should return UPDATE_PLAYERS_LIST type", () => {
            expect(result.type).toEqual(
                UPDATE_PLAYERS_LIST
            )
        }) 
        it("should return correct playerCount type", () => {
            expect(typeof result.payload.playerCount === 'number').toEqual(true)
        }) 
        it("should return correct playerId type", () => {
            expect(typeof result.payload.playerId === 'number').toEqual(true)
        })  
        it("should return correct player type", () => {
            expect(typeof result.payload.player === 'string').toEqual(true)
        })  
        it("should return correct myTurn type", () => {
            expect(typeof result.payload.myTurn === 'boolean').toEqual(true)
        })  
    })
})