import {
    createSlice,
    configureStore
} from 'redux-starter-kit'

import { Action } from './../Models/Action';

import { Board } from '../Models/Board';
import { LastSquares } from '../Models/LastSquares';

export const startPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const initialState :Board= {
    checkmate: false,
    inCheck: false,
    fen: startPosition,
    lastSquares: {
        from: '',
        to: ''
    },
    notation : '',
    pgn : '',
    turn: 'w',
}

export const boardReducer = createSlice({
    initialState,
    reducers:{
        setFen :(state :Board,action : {type: string, payload: string}) => {
            state.fen = action.payload
        },
        setLastSquares :(state :Board,action : {type: string, payload: LastSquares}) => {
            state.lastSquares = action.payload
        },
        setPgn : (state :Board,action : {type: string, payload: string}) => {
            state.pgn = action.payload
        },
        setBoardState: (state :Board,action : {type: string, payload: Board}) => {
            const {checkmate,inCheck,fen,lastSquares,notation,pgn,turn} = action.payload;
            state.checkmate = checkmate;
            state.inCheck = inCheck;
            state.fen = fen;
            state.lastSquares = lastSquares;
            state.notation = notation;
            state.pgn = pgn;
            state.turn = turn;
        },
    }
})