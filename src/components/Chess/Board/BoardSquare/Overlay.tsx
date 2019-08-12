//REACT IMPORTS
import React, { Fragment } from 'react';
import { Board } from '../../../../Models/Board';

//PROJECT IMPORTS
import * as boardSettings from '../../../../board';

//LIBRARY IMPORTS
import _ from 'lodash';

interface Props{
    board:Board;
    square:string;
    piece:string;
    squareColor:string;
}

const isWhiteTurn = (turn: string) => turn === boardSettings.whiteTurn;

const canRenderShortCastle = (possibleSquares: any[], currentTurn: string, square: string) =>
_.includes(possibleSquares, boardSettings.shortCastle)
&& (isWhiteTurn(currentTurn) ? /([fg]1)/.test(square) : /([fg]8)/.test(square));

const canRenderLongCastle = (possibleSquares: string[], CurrentTurn: string, square: string) =>
_.includes(possibleSquares, boardSettings.longCastle)
&& (isWhiteTurn(CurrentTurn) ? /([bcd]1)/.test(square) : /([bcd]8)/.test(square));

const Overlay = (props:Props) => {
    if (
        _.includes(props.board.possibleSquares, props.square) ||
        canRenderShortCastle(props.board.possibleSquares, props.board.turn, props.square) ||
        canRenderLongCastle(props.board.possibleSquares, props.board.turn, props.square)
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