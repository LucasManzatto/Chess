import {createSlice} from 'redux-starter-kit'

import { State } from '../Models/State';

import { initialSettings } from './initialSettings'
import { Board } from '../Models/Board';
import { Square } from '../Models/Square';

export interface RootReducerActions{
    addOpening(payload:any): void;
    addMoveToHistory(payload:Board): void;
    clearBoard(): void;
    setClickedPiece(payload:Square): void;
    setJogadas(payload:Board[]): void;
    setMoveHistory(payload:Board[]): void;
    setOpenings(payload:any[]): void;
    setPossibleSquares(payload:Square[]): void;
    setSubOpenings(payload:any[]): void;
}

const reducers = {
    addOpening: (state: State,action: { payload: any }) => {
        state.openings.push(action.payload)
    },
    addMoveToHistory: (state: State,action: { payload: Board }) => {
        state.boardHistory.push(action.payload)
    },
    clearBoard: (state: State) => {
        state.clickedPiece = "";
        state.possibleSquares = [];
    },
    setClickedPiece: (state: State,action: {payload: Square }) => {
        state.clickedPiece = action.payload
    },
    setJogadas: (state: State,action: { payload: Board[] }) => {
        state.boardHistory = action.payload
    },
    setMoveHistory: (state: State,action: { payload: Board[] }) => {
        state.boardHistory = action.payload;
    },
    setOpenings: (state: State,action: { payload: any[] }) => {
        state.openings = action.payload
    },
    setPossibleSquares: (state: State,action: {payload: Square[] }) => {
        state.possibleSquares = action.payload
    },
    setSubOpenings: (state: State,action: { payload: any[] }) => {
        state.subOpenings = action.payload
    },

}

export const rootReducer = createSlice({
    initialState: initialSettings,
    reducers
})


