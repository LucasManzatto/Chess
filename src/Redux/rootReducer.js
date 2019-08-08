import {
    createReducer
} from 'redux-starter-kit'

import * as actions from './actions'

import {
    initialSettings
} from './initialSettings'

const rootReducer = createReducer(initialSettings, {
    [actions.setFen]: (state, action) => {
        state.fen = action.payload
    },
    [actions.setJogadas]: (state, action) => {
        state.jogadas = action.payload
    },
    [actions.setClickedPiece]: (state, action) => {
        state.clickedPiece = action.payload
    },
    [actions.setPossibleSquares]: (state, action) => {
        state.possibleSquares = action.payload
    },
    [actions.setLastSquares]: (state, action) => {
        state.lastSquares = action.payload
    },
    [actions.setBoardState]: (state, action) => {
        const {
            fen,
            pgn,
            turn,
            checkmate,
            lastSquares,
            possibleSquares,
            jogadas
        } = action.payload
        state.fen = fen
        state.turn = turn
        state.checkmate = checkmate
        state.lastSquares = lastSquares
        state.possibleSquares = possibleSquares
        state.jogadas = jogadas
        state.pgn = pgn
    },
    [actions.setOpenings]: (state, action) => {
        state.openings = action.payload
    },
    [actions.setSubOpenings]: (state, action) => {
        state.subOpenings = action.payload
    },
    [actions.setPgn]: (state, action) => {
        state.pgn = action.payload
    },
    [actions.addOpening]: (state, action) => {
        state.openings.push(action.payload)
    },
})
export default rootReducer