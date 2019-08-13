import {
    createSlice,
    configureStore
} from 'redux-starter-kit'

import { Board } from '../Models/Board';
import { Action } from './../Models/Action';

import {
    initialSettings
} from './initialSettings'

export const rootReducer = createSlice({
    initialState: initialSettings,
    reducers :{
        setFen :(state :Board,action : Action) => {
            state.fen = action.payload
        },
        setJogadas :(state :Board,action : Action) => {
            state.moves = action.payload
        },
        setClickedPiece : (state :Board,action : Action) => {
            state.clickedPiece = action.payload
        },
        setPossibleSquares :(state :Board,action : Action) => {
            state.possibleSquares = action.payload
        },
        setLastSquares :(state :Board,action : Action) => {
            state.lastSquares = action.payload
        },
        setOpenings :(state :Board,action : Action) => {
            state.openings = action.payload
        },
        setSubOpenings :(state :Board,action : Action) => {
            state.subOpenings = action.payload
        },
        setPgn : (state :Board,action : Action) => {
            state.pgn = action.payload
        },
        addOpening : (state :Board,action : Action) =>{
            state.openings.push(action.payload)
        },
        setBoardState: (state :Board,action : Action) => {
            const {
                fen,
                pgn,
                turn,
                inCheck,
                checkmate,
                lastSquares,
                possibleSquares,
                newMove
            } = action.payload
            state.fen = fen
            state.turn = turn
            state.checkmate = checkmate
            state.inCheck = inCheck
            state.lastSquares = lastSquares
            state.possibleSquares = possibleSquares
            state.moves.push(newMove)
            state.pgn = pgn
        },
    }
})

export const store = configureStore({ reducer: {board : rootReducer.reducer} ,preLoadedState : initialSettings})
