//REACT IMPORTS
import React from 'react';

//LIBRARY IMPORTS
import * as Chess from 'chess.js';
import _ from 'lodash';

//PROJECT IMPORTS
import { Piece } from '../../../../../Models/Piece';

//REDUX IMPORTS
import { connect } from 'react-redux';
import { rootReducer } from '../../../../../Redux/rootReducer';
const {actions} = rootReducer;
const { setClickedPiece, setPossibleSquares }  = actions;

interface Props{
	fen: string;
	square: string;
	setClickedPiece : Function;
	setPossibleSquares : Function;
	piece : Piece;
}

const getPossibleSquares = (moves: string[]) => {
	return moves.map((move) => _.replace(move, /(.[x]|([N].(?![1-9]))|([QKRNB+#]))/g, ''));
};

const BoardPiece = (props:Props) => {
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
