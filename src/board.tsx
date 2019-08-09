import * as Chess from 'chess.js';
import { Pieces, Piece } from './Models/Piece';
import _ from 'lodash'


const baseUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumba';


export const whiteTurn ='w';
export const blackTurn = 'b';
export const shortCastle = "O-O";
export const longCastle = "O-O-O";

export const pieces : Pieces = {
    white :[
        {
            name: 'P',
            img: `${baseUrl}/4/45/Chess_plt45.svg/240px-Chess_plt45.svg.png`,
            asciiImg : ''
        },
        {
            name: 'N',
            img: `${baseUrl}/7/70/Chess_nlt45.svg/240px-Chess_nlt45.svg.pgn`,
            asciiImg : '♘'
        },
        {
            name: 'B',
            img: `${baseUrl}/b/b1/Chess_blt45.svg/240px-Chess_blt45.svg.pgn`,
            asciiImg: '♗'
        },
        {
            name: 'Q',
            img: `${baseUrl}/1/15/Chess_qlt45.svg/240px-Chess_qlt45.svg.pgn`,
            asciiImg: '♕'
        },
        {
            name: 'K',
            img: `${baseUrl}/4/42/Chess_klt45.svg/240px-Chess_klt45.svg.pgn`,
            asciiImg: '♔'
        },
        {
            name: 'R',
            img: `${baseUrl}/7/72/Chess_rlt45.svg/240px-Chess_rlt45.svg.pgn`,
            asciiImg: '♖'
        },
    ],
    black:[
        {
            name: 'p',
            img: `${baseUrl}/c/c7/Chess_pdt45.svg/240px-Chess_pdt45.svg.pgn`,
            asciiImg: ''
        },
        {
            name: 'n',
            img: `${baseUrl}/e/ef/Chess_ndt45.svg/240px-Chess_ndt45.svg.pgn`,
            asciiImg : '♞'
        },
        {
            name: 'b',
            img: `${baseUrl}/9/98/Chess_bdt45.svg/240px-Chess_bdt45.svg.pgn`,
            asciiImg: '♝'
        },
        {
            name: 'q',
            img: `${baseUrl}/4/47/Chess_qdt45.svg/240px-Chess_qdt45.svg.pgn`,
            asciiImg:'♛'
        },
        {
            name: 'k',
            img: `${baseUrl}/f/f0/Chess_kdt45.svg/240px-Chess_kdt45.svg.pgn`,
            asciiImg:'♚'
        },
        {
            name: 'r',
            img: `${baseUrl}/f/ff/Chess_rdt45.svg/240px-Chess_rdt45.svg.pgn`,
            asciiImg: '♜'
        },
    ]
}

export const isWhite = (pieceName: string) => pieceName === pieceName.toUpperCase();

export const findPiece = (piece: string) : Piece => isWhite(piece)
    ? _.find(pieces.white, (p: Piece) => p.name === piece)
    : _.find(pieces.black, (p: Piece) => p.name === piece)


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