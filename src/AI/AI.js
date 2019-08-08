import _ from 'lodash';
import * as Chess from 'chess.js'
const values = [{
        peca: 'P',
        value: 10,
    },
    {
        peca: 'N',
        value: 30,
    },
    {
        peca: 'B',
        value: 30,
    },
    {
        peca: 'R',
        value: 50,
    },
    {
        peca: 'Q',
        value: 90,
    },
    {
        peca: 'K',
        value: 900
    }, {
        peca: 'p',
        value: -10,
    },
    {
        peca: 'n',
        value: -30,
    },
    {
        peca: 'b',
        value: -30,
    },
    {
        peca: 'r',
        value: -50,
    },
    {
        peca: 'q',
        value: -90,
    },
    {
        peca: 'k',
        value: -900,
    }, {
        peca: '',
        value: 0
    }
];

const multiplier = {
    rank12: 1,
    rank34: 2,
    rank56: 3,
    rank78: 4
}

const isBlack = piece => {
    return /[pnbrqk]/.test(piece)
}

const getPieceScore = (piece) =>
    _.find(values, {
        'peca': piece
    }).value

    const teste = () => 0;

export const getBestMove = chess => {
    const testBoard = new Chess(chess.fen())
    const depth = 3;
    let moves = []
    testBoard.moves().map(move => {
        const m = testBoard.move(move)
        moves.push({
            score: negamax(testBoard, m, depth, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
            move
        })
        testBoard.undo()
    })
    let bestMove = findMin(moves).move
    findMin(moves)
    return bestMove;
}
const findMax = moves => {
    let max = Number.MIN_SAFE_INTEGER
    let m = {}
    moves.forEach(move => {
        if (move.score > max) {
            max = move.score
            m = move;
        }
    })
    return m;
}
const findMin = moves => {
    let min = Number.MAX_SAFE_INTEGER
    let m = {}
    moves.forEach(move => {
        if (move.score < min) {
            min = move.score
            m = move;
        }
    })
    return m;
}

const getScore = (fen, captured) => {
    let fullFen = _.split(fen, ' ');
    let board = _.split(fullFen[0], '/');
    let rowNumber = 1
    let multiplier = 1;
    let score = 0;
    board.map(row => {
        // if (rowNumber === 1 || rowNumber === 2) {
        //     multiplier = 1;
        // } else if (rowNumber === 3 || rowNumber === 4) {
        //     multiplier = 2;
        // } else if (rowNumber === 5 || rowNumber === 6) {
        //     multiplier = 3;
        // } else if (rowNumber === 7 || rowNumber === 8) {
        //     multiplier = 4;
        // }
        const whitePieces = _.replace(row, /([^QKRNBP])/g, '')
        let whiteScore = _.reduce(_.map(_.split(whitePieces, ''), piece => getPieceScore(piece)), (total, score) => total + (score * multiplier))

        // if (rowNumber === 1 || rowNumber === 2) {
        //     multiplier = 4;
        // } else if (rowNumber === 3 || rowNumber === 4) {
        //     multiplier = 3;
        // } else if (rowNumber === 5 || rowNumber === 6) {
        //     multiplier = 2;
        // } else if (rowNumber === 7 || rowNumber === 8) {
        //     multiplier = 1;
        // }
        const blackPieces = _.replace(row, /([^qkrnbp])/g, '')
        let blackScore = _.reduce(_.map(_.split(blackPieces, ''), piece => getPieceScore(piece)), (total, score) => total + (score * multiplier))

        if (whiteScore === undefined) {
            whiteScore = 0
        }
        if (blackScore === undefined) {
            blackScore = 0
        }
        let capturedModifier = 1
        if (whitePieces.length !== blackPieces.length) {
            capturedModifier = 2;
        }
        //console.log({whiteScore,blackScore})
        score += (whiteScore + blackScore) * capturedModifier;
        rowNumber++;
    })
    return score;
}

function negamax(chess, move, depth, alpha, beta) {
    if (depth <= 0 || chess.in_draw()) {
        // console.log(/([1-9]\..+[^"])/g.exec(chess.pgn())[0].slice(-3))
        // console.log({
        //     pgn: /([1-9]\..+[^"])/g.exec(chess.pgn())[0],
        //     score: getScore(chess.fen(), move)
        // })
        return getScore(chess.fen(), move);
    }
    let value = Number.MIN_SAFE_INTEGER;
    let moves = chess.moves();
    for (let i = 0; i < moves.length; i++) {
        const move = chess.move(moves[i]);
        value = Math.max(value, -negamax(chess, move, depth - 1, -alpha, -beta));
        alpha = Math.max(alpha, value);
        chess.undo();
        if (alpha >= beta) {
            //console.log('prunning')
            break;
        }
    }
    return value;
}