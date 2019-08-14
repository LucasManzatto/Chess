import {
    createSlice,
    configureStore
} from 'redux-starter-kit'

import { State } from '../Models/State';
import { Action } from './../Models/Action';

import {initialSettings} from './initialSettings'

export const rootReducer = createSlice({
    initialState: initialSettings,
    reducers :{
        setJogadas :(state :State,action : Action) => {
            state.boardHistory = action.payload
        },
        setClickedPiece : (state :State,action : Action) => {
            state.clickedPiece = action.payload
        },
        setPossibleSquares :(state :State,action : Action) => {
            state.possibleSquares = action.payload
        },
        setOpenings :(state :State,action : Action) => {
            state.openings = action.payload
        },
        setSubOpenings :(state :State,action : Action) => {
            state.subOpenings = action.payload
        },
        addOpening : (state :State,action : Action) =>{
            state.openings.push(action.payload)
        },
        addMoveToHistory : (state :State,action : Action) =>{
            state.boardHistory.push(action.payload.newMove)
        },
    }
})


