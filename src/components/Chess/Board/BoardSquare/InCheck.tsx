//REACT IMPORTS
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

//PROJECT IMPORTS
import * as boardSettings from '../../../../board';

interface Props{
    piece:string;
    inCheck: boolean;
    turn: string;
}

const isWhiteTurn = (turn: string) => turn === boardSettings.whiteTurn;

const isBlackTurn = (turn: string) => turn === boardSettings.blackTurn;

const InCheck = (props: Props) => {
    let whiteKing = boardSettings.findPiece("K").name;
    let blackKing = boardSettings.findPiece("k").name;

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

export default InCheck;
