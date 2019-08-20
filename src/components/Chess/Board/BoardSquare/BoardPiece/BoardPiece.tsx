//REACT IMPORTS
import React from 'react';

//LIBRARY IMPORTS
import * as Chess from 'chess.js';
import _ from 'lodash';

//PROJECT IMPORTS
import { Piece } from '../../../../../Models/State';
import * as boardSettings from '../../../../../board';
import { Square } from '../../../../../Models/Square';

//REDUX IMPORTS
import { connect } from 'react-redux';
import { rootReducer } from '../../../../../Redux/rootReducer';

interface Props {
	fen: string;
	square: Square;
	setClickedPiece: Function;
	setPossibleSquares: Function;
	piece: Piece;
}

const getPossibleSquares = (moves: string[]) => {
	return moves.map((move) => _.replace(move, /(.[x]|([N].(?![1-9]))|([QKRNB+#]))|=/g, ''));
};

const BoardPiece = (props: Props) => {
	if(props.piece=== "") return null;

	const pieceImage = boardSettings.findPiece(props.piece).img;
	const handleClick = () => {
		const chess = new Chess(props.fen);
		props.setClickedPiece(props.square);
		console.log(getPossibleSquares(chess.moves({ square: props.square })));
		props.setPossibleSquares(getPossibleSquares(chess.moves({ square: props.square })));
	};
	return <img draggable={false} onClick={handleClick} alt="Piece" height={'100%'} width={'100%'} src={pieceImage} />;
};
const mapStateToProps = (state: any) => {
	return { fen: state.board.fen };
};

export default connect(mapStateToProps, rootReducer.actions)(BoardPiece);
