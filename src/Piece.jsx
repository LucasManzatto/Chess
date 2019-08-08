/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { setClickedPiece, setPossibleSquares } from './Redux/actions';
import * as Chess from 'chess.js';
import Draggable from 'react-draggable';
import _ from 'lodash';

const Piece = (props) => {
	const getPossibleSquares = (moves) => {
		return moves.map((move) => _.replace(move, /(.[x]|([N].(?![1-9]))|([QKRNB+#]))/g, ''));
	};

	const handleClick = () => {
		const chess = new Chess(props.fen);
		props.setClickedPiece(props.square);
		props.setPossibleSquares(getPossibleSquares(chess.moves({ square: props.square })));
	};
	return <img onClick={handleClick} alt="Piece" height={'100%'} width={'100%'} src={props.piece.img} />;
};
const mapStateToProps = (state) => {
	return { fen: state.board.fen };
};

export default connect(mapStateToProps, { setClickedPiece, setPossibleSquares })(Piece);
