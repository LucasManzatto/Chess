import {
    createSlice,
    configureStore
} from 'redux-starter-kit'

import {
    initialSettings
} from './initialSettings'

export const rootReducer = createSlice({
    initialState: initialSettings,
    reducers :{
        setFen :(state,action) => {
            state.fen = action.payload
        },
        setJogadas :(state,action) => {
            state.jogadas = action.payload
        },
        setClickedPiece : (state,action) => {
            state.clickedPiece = action.payload
        },
        setPossibleSquares :(state,action) => {
            state.possibleSquares = action.payload
        },
        setLastSquares :(state,action) => {
            state.lastSquares = action.payload
        },
        setOpenings :(state,action) => {
            state.openings = action.payload
        },
        setSubOpenings :(state,action) => {
            state.subOpenings = action.payload
        },
        setPgn : (state,action) => {
            state.pgn = action.payload
        },
        addOpening : (state,action) =>{
            state.openings.push(action.payload)
        },
        setBoardState: (state,action) => {
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
    }
})

export const store = configureStore({ reducer: {board : rootReducer.reducer} ,preLoadedState : initialSettings})
