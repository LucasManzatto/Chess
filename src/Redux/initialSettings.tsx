import { State } from "../Models/State";

export const startPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';


export const initialSettings : State = {
    possibleSquares: [],
    openings: [],
    subOpenings: [],
    clickedPiece: '',
    boardHistory: [],
    capturedPieces:{
        white: [],
        black: []
    },
}