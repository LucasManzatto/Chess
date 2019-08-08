import * as Chess from 'chess.js';
export const pieces = {
    white: {
        pawn: {
            name: 'P',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/240px-Chess_plt45.svg.png',
        },
        knight: {
            name: 'N',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/240px-Chess_nlt45.svg.png',
        },
        bishop: {
            name: 'B',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/240px-Chess_blt45.svg.png',
        },
        queen: {
            name: 'Q',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/240px-Chess_qlt45.svg.png',
        },
        king: {
            name: 'K',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/240px-Chess_klt45.svg.png',
        },
        rook: {
            name: 'R',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/240px-Chess_rlt45.svg.png',
        },
    },
    black: {
        pawn: {
            name: 'p',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/240px-Chess_pdt45.svg.png',
        },
        knight: {
            name: 'n',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/240px-Chess_ndt45.svg.png',
        },
        bishop: {
            name: 'b',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/240px-Chess_bdt45.svg.png',
        },
        queen: {
            name: 'q',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/240px-Chess_qdt45.svg.png',
        },
        king: {
            name: 'k',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/240px-Chess_kdt45.svg.png',
        },
        rook: {
            name: 'r',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/240px-Chess_rdt45.svg.png',
        },
    }
}

export const findPiece = piece => {
    switch (piece) {
        case pieces.white.pawn.name:
            return pieces.white.pawn;
        case pieces.white.knight.name:
            return pieces.white.knight;
        case pieces.white.king.name:
            return pieces.white.king;
        case pieces.white.queen.name:
            return pieces.white.queen;
        case pieces.white.rook.name:
            return pieces.white.rook;
        case pieces.white.bishop.name:
            return pieces.white.bishop;
        case pieces.black.pawn.name:
            return pieces.black.pawn;
        case pieces.black.knight.name:
            return pieces.black.knight;
        case pieces.black.king.name:
            return pieces.black.king;
        case pieces.black.queen.name:
            return pieces.black.queen;
        case pieces.black.rook.name:
            return pieces.black.rook;
        case pieces.black.bishop.name:
            return pieces.black.bishop;
        default:
            return '';
    }
}

export const chess = new Chess();

export const positions = {
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