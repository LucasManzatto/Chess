//REACT IMPORTS
import React, { Fragment,CSSProperties } from 'react';

//PROJECT IMPORTS
import * as boardSettings from '../../../../../board';
import { Turn } from '../../../../../Models/Turn';
import { Piece } from '../../../../../Models/State';

interface Props {
    piece: Piece;
    inCheck: boolean;
    turn: Turn;
}

const isWhiteTurn = (turn: Turn) => turn === boardSettings.whiteTurn;

const isBlackTurn = (turn: Turn) => turn === boardSettings.blackTurn;

const Check = (props: Props) => {
    let whiteKing: Piece = "k";
    let blackKing: Piece = "K";

    const inCheck: CSSProperties = {
        position: 'absolute',
        borderRadius: 50,
        height: '100%',
        width: '100%',
        zIndex: -1,
        opacity: 0.3,
        backgroundColor: 'red'
    }

    return props.inCheck &&
        ((isWhiteTurn(props.turn) && props.piece === whiteKing) ||
            (isBlackTurn(props.turn) && props.piece === blackKing))
        ? <div style={inCheck} />
        : <Fragment></Fragment>
};

export default Check;
