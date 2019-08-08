import {
    createAction
} from 'redux-starter-kit'

export const setFen = createAction('SET_FEN')

export const setClickedPiece = createAction('SET_CLICKED_PIECE')

export const setPossibleSquares = createAction('SET_POSSIBLE_SQUARES')

export const setTurn = createAction('SET_TURN')

export const setCheckmate = createAction('SET_CHECKMATE')

export const setLastSquares = createAction('SET_LAST_SQUARES')

export const setJogadas = createAction('SET_JOGADAS')

export const setBoardState = createAction('SET_BOARD_STATE')

export const setOpenings = createAction('SET_OPENINGS')

export const addOpening = createAction('ADD_OPENING')

export const setSubOpenings = createAction('SET_SUB_OPENINGS')

export const setPgn = createAction('SET_PGN')