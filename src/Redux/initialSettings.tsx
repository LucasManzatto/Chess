import { Board } from "../Models/Board";

export const startPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';


export const initialSettings : Board = {
    openings: [],
    subOpenings: [],
    clickedPiece: '',
    possibleSquares: [],
    fen: startPosition,
    pgn : '',
    inCheck: false,
    checkmate: false,
    turn: 'w',
    jogadas: [],
    lastSquares: {
        from: '',
        to: ''
    },
    dimensions: {
        height: 0,
        width: 0
    },
    capturedPieces:{
        white: [],
        black: []
    },
    cellWidth: 0
}