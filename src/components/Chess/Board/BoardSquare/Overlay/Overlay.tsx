//REACT IMPORTS
import React, { Fragment } from 'react';

//PROJECT IMPORTS
import * as boardSettings from '../../../../../board';
import { State, Piece } from '../../../../../Models/State';
import { Turn } from '../../../../../Models/Turn';
import { Square } from '../../../../../Models/Square';
import { Board } from '../../../../../Models/Board';

//LIBRARY IMPORTS
import _ from 'lodash';

interface Props {
    board: Board;
    app: State;
    square: Square;
    piece: Piece;
    squareColor: string;
}

const isWhiteTurn = (turn: Turn) => turn === boardSettings.whiteTurn;

const canRenderShortCastle = (possibleSquares: Square[], currentTurn: Turn, square: Square) =>
    _.includes(possibleSquares, boardSettings.shortCastle)
    && (isWhiteTurn(currentTurn) ? /([fg]1)/.test(square) : /([fg]8)/.test(square));

const canRenderLongCastle = (possibleSquares: Square[], CurrentTurn: Turn, square: Square) =>
    _.includes(possibleSquares, boardSettings.longCastle)
    && (isWhiteTurn(CurrentTurn) ? /([bcd]1)/.test(square) : /([bcd]8)/.test(square));

const Overlay = (props: Props) => {
    if (
        _.includes(props.app.possibleSquares, props.square) ||
        canRenderShortCastle(props.app.possibleSquares, props.board.turn, props.square) ||
        canRenderLongCastle(props.app.possibleSquares, props.board.turn, props.square)
    ) {
        if (props.piece === '') {
            return (
                <div
                    style={{
                        position: 'absolute',
                        borderRadius: 50,
                        margin: '37.5%',
                        height: '25%',
                        width: '25%',
                        zIndex: -1,
                        opacity: 0.5,
                        backgroundColor: 'green'
                    }}
                />
            );
        } else {
            return (
                <div
                    style={{
                        opacity: 0.5,
                        zIndex: -5,
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        backgroundColor: 'green'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            borderRadius: 25,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 1,
                            backgroundColor: props.squareColor
                        }}
                    />
                </div>
            );
        }
    }
    else return <Fragment></Fragment>
};
export default Overlay;