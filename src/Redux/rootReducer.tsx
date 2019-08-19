import {
    createSlice,
    configureStore
} from 'redux-starter-kit'

import { State } from '../Models/State';
import { Action } from './../Models/Action';

import { initialSettings } from './initialSettings'
import { Board } from '../Models/Board';
import { Square } from '../Models/Square';

export interface IRootReducer{
    clearBoard(): void;
    setJogadas(payload: Board[]): void;
    setClickedPiece(payload: Square): void;
    setPossibleSquares(payload: Square[]): void;
    setOpenings(payload: any[]): void;
    setSubOpenings(payload: any[]): void;
    addOpening(payload: any): void;
    addMoveToHistory(payload: Board): void;
    setMoveHistory(payload: Board[]): void;
}

const reducers = {
    clearBoard: (state: State) => {
        state.clickedPiece = "";
        state.possibleSquares = [];
    },
    setJogadas: (state: State,action: { payload: Board[] }) => {
        state.boardHistory = action.payload
    },
    setClickedPiece: (state: State,action: {payload: Square }) => {
        state.clickedPiece = action.payload
    },
    setPossibleSquares: (state: State,action: {payload: Square[] }) => {
        state.possibleSquares = action.payload
    },
    setOpenings: (state: State,action: { payload: any[] }) => {
        state.openings = action.payload
    },
    setSubOpenings: (state: State,action: { payload: any[] }) => {
        state.subOpenings = action.payload
    },
    addOpening: (state: State,action: { payload: any }) => {
        state.openings.push(action.payload)
    },
    addMoveToHistory: (state: State,action: { payload: Board }) => {
        state.boardHistory.push(action.payload)
    },
    setMoveHistory: (state: State,action: { payload: Board[] }) => {
        state.boardHistory = action.payload;
    },
}

export const rootReducer = createSlice({
    initialState: initialSettings,
    reducers
})


