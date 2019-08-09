/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import * as Chess from 'chess.js';
import _ from 'lodash';

import { rootReducer } from '../../../Redux/rootReducer';
import { Piece } from '../../../Models/Piece';
const {actions} = rootReducer;
const { setClickedPiece, setPossibleSquares }  = actions;

interface Props{
	fen: string;
	square: string;
	setClickedPiece : Function;
	setPossibleSquares : Function;
	piece : Piece;
}

const BoardPiece = (props:Props) => {
	const getPossibleSquares = (moves: string[]) => {
		return moves.map((move) => _.replace(move, /(.[x]|([N].(?![1-9]))|([QKRNB+#]))/g, ''));
	};

	const handleClick = () => {
		const chess = new Chess(props.fen);
		props.setClickedPiece(props.square);
		props.setPossibleSquares(getPossibleSquares(chess.moves({ square: props.square })));
	};
	return <img onClick={handleClick} alt="Piece" height={'100%'} width={'100%'} src={props.piece.img} />;
};
const mapStateToProps = (state:any) => {
	return { fen: state.board.fen };
};

export default connect(mapStateToProps, { setClickedPiece, setPossibleSquares })(BoardPiece);