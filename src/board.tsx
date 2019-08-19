import * as Chess from 'chess.js';
import { Pieces, Piece } from './Models/Piece';
import _ from 'lodash'
import { Turn } from './Models/Turn';


const baseUrl = 'https://marcelk.net/chess/pieces/merida/320/';

const createImgUrl = (piece:string) => `${baseUrl}${piece}.png`

export const whiteTurn :Turn='w';
export const blackTurn :Turn='b';
export const shortCastle = "O-O";
export const longCastle = "O-O-O";

export const lightSquare = '#F1D9B7';
export const darkSquare = '#B28A63';

export const inverseSquareColor = (squareColor: string) => squareColor === lightSquare ? darkSquare : lightSquare;

export const pieces : Pieces = {
    white :[
        {
            name: 'P',
            img: createImgUrl("WhitePawn"),
            asciiImg : ''
        },
        {
            name: 'N',
            img: createImgUrl("WhiteKnight"),
            asciiImg : '♘'
        },
        {
            name: 'B',
            img: createImgUrl("WhiteBishop"),
            asciiImg: '♗'
        },
        {
            name: 'Q',
            img: createImgUrl("WhiteQueen"),
            asciiImg: '♕'
        },
        {
            name: 'K',
            img: createImgUrl("WhiteKing"),
            asciiImg: '♔'
        },
        {
            name: 'R',
            img: createImgUrl("WhiteRook"),
            asciiImg: '♖'
        },
    ],
    black:[
        {
            name: 'p',
            img: createImgUrl("BlackPawn"),
            asciiImg: ''
        },
        {
            name: 'n',
            img: createImgUrl("BlackKnight"),
            asciiImg : '♞'
        },
        {
            name: 'b',
            img: createImgUrl("BlackBishop"),
            asciiImg: '♝'
        },
        {
            name: 'q',
            img: createImgUrl("BlackQueen"),
            asciiImg:'♛'
        },
        {
            name: 'k',
            img: createImgUrl("BlackKing"),
            asciiImg:'♚'
        },
        {
            name: 'r',
            img: createImgUrl("BlackRook"),
            asciiImg: '♜'
        },
    ]
}

export const isWhite = (pieceName: string) => pieceName === pieceName.toUpperCase();

export const findPiece = (piece: string) : Piece => {
    if(!["p","n","b","q","k","r"].includes(piece.toLowerCase())){
        piece = "p";
    }
    return isWhite(piece)
    ? _.find(pieces.white, (p: Piece) => p.name === piece)
    : _.find(pieces.black, (p: Piece) => p.name === piece)
}


export const chess = new Chess();

export const positions: any = {
    0: "a8",
    1: "b8",
    2: "c8",
    3: "d8",
    4: "e8",
    5: "f8",
    6: "g8",
    7: "h8",
    8: "a7",
    9: "b7",
    10: "c7",
    11: "d7",
    12: "e7",
    13: "f7",
    14: "g7",
    15: "h7",
    16: "a6",
    17: "b6",
    18: "c6",
    19: "d6",
    20: "e6",
    21: "f6",
    22: "g6",
    23: "h6",
    24: "a5",
    25: "b5",
    26: "c5",
    27: "d5",
    28: "e5",
    29: "f5",
    30: "g5",
    31: "h5",
    32: "a4",
    33: "b4",
    34: "c4",
    35: "d4",
    36: "e4",
    37: "f4",
    38: "g4",
    39: "h4",
    40: "a3",
    41: "b3",
    42: "c3",
    43: "d3",
    44: "e3",
    45: "f3",
    46: "g3",
    47: "h3",
    48: "a2",
    49: "b2",
    50: "c2",
    51: "d2",
    52: "e2",
    53: "f2",
    54: "g2",
    55: "h2",
    56: "a1",
    57: "b1",
    58: "c1",
    59: "d1",
    60: "e1",
    61: "f1",
    62: "g1",
    63: "h1",
}