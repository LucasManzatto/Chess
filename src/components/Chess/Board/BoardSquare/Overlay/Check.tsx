//REACT IMPORTS
import React, { Fragment } from 'react';

//PROJECT IMPORTS
import * as boardSettings from '../../../../../board';
import { Turn } from '../../../../../Models/Turn';
import { Piece } from '../../../../../Models/Board';

interface Props {
    piece: Piece;
    inCheck: boolean;
    turn: Turn;
}

const isWhiteTurn = (turn: Turn) => turn === boardSettings.whiteTurn;

const isBlackTurn = (turn: Turn) => turn === boardSettings.blackTurn;

const Check = (props: Props) => {
    let whiteKing :Piece= "K";
    let blackKing :Piece ="k";

    return props.inCheck &&
        ((isWhiteTurn(props.turn) && props.piece === whiteKing) ||
            (isBlackTurn(props.turn) && props.piece === blackKing))
        ? (
            <div
                style={{
                    position: 'absolute',
                    borderRadius: 50,
                    height: '100%',
                    width: '100%',
                    zIndex: -1,
                    opacity: 0.3,
                    backgroundColor: 'red'
                }}
            />
        )
        : <Fragment></Fragment>
};

export default Check;
