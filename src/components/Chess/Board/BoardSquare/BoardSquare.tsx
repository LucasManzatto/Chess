//REACT IMPORTS
import React from 'react';

//MATERIAL IMPORTS

//PROJECT IMPORTS
import BoardPiece from './BoardPiece/BoardPiece';
import { Board, Piece, Square } from '../../../../Models/Board';
import { Move } from '../../../../Models/Move';
import * as boardSettings from '../../../../board';
import Check from './Overlay/Check';
import Last from './Overlay/Last';
import ColumnNumber from './Overlay/ColumnNumber';
import Overlay from './Overlay/Overlay';
import RowLetter from './Overlay/RowLetter';

//LIBRARY IMPORTS
import * as Chess from 'chess.js';
import _ from 'lodash';

//REDUX IMPORTS
import { connect } from 'react-redux';
import { rootReducer } from '../../../../Redux/rootReducer';
const { actions } = rootReducer;
const { setPossibleSquares, setClickedPiece, setBoardState } = actions;


interface Props {
	board: Board;
	piece: Piece;
	square: Square;
	squareColor: string;
	setClickedPiece: Function;
	setPossibleSquares: Function;
	setBoardState: Function;
}

const BoardSquare = (props: Props) => {

	const isSameSquare = (from: Square, to: Square) => from === to;

	const canMove = (chess: any, from: Square, to: Square) => chess.move({ from, to, promotion: 'q' }) != null;

	const resetSquare = () => {
		props.setClickedPiece('');
		props.setPossibleSquares([]);
	};

	const includeSquare = (possibleSquares: Square[], square: Square) => {
		return (
			_.includes(possibleSquares, square) ||
			_.includes(possibleSquares, boardSettings.shortCastle) ||
			_.includes(possibleSquares, boardSettings.longCastle)
		);
	};

	const movePiece = () => {
		const chess = new Chess();
		chess.load_pgn(props.board.pgn);
		const squareFrom = props.board.clickedPiece;
		const possibleSquares = props.board.possibleSquares;

		if (isSameSquare(squareFrom, props.square)) {
			resetSquare();
		}

		if (includeSquare(possibleSquares, props.square) && canMove(chess, squareFrom, props.square)) {
			const newMove: Move = {
				fen: chess.fen(),
				jogada: chess.history().slice(-1),
				turn: props.board.turn,
				lastSquares: { from: squareFrom, to: props.square }
			};

			props.setBoardState({
				fen: chess.fen(),
				pgn: chess.pgn(),
				turn: chess.turn(),
				checkmate: chess.in_checkmate(),
				inCheck: chess.in_check(),
				lastSquares: { from: squareFrom, to: props.square },
				possibleSquares: [],
				newMove
			});
		}
	};

	return (
		<div className="col p-0" onClick={movePiece} key={props.piece} style={{ zIndex: 0, backgroundColor: props.squareColor }}>

			<Check inCheck={props.board.inCheck}
				piece={props.piece}
				turn={props.board.turn} />

			<Last lastSquares={props.board.lastSquares}
				square={props.square}
				possibleSquares={props.board.possibleSquares} />

			<ColumnNumber square={props.square}
				squareColor={props.squareColor} />

			<RowLetter square={props.square}
				squareColor={props.squareColor} />

			<Overlay board={props.board}
				square={props.square}
				squareColor={props.squareColor}
				piece={props.piece} />

			{props.piece !== '' && <BoardPiece piece={boardSettings.findPiece(props.piece)} square={props.square} />}
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		board: state.board
	};
};
export default connect(mapStateToProps, { setPossibleSquares, setClickedPiece, setBoardState })(BoardSquare);
