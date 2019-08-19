//REACT IMPORTS
import React from 'react';

//MATERIAL IMPORTS

//PROJECT IMPORTS
import BoardPiece from './BoardPiece/BoardPiece';
import { State, Piece } from '../../../../Models/State';
import { Board } from '../../../../Models/Board';
import * as boardSettings from '../../../../board';
import Check from './Overlay/Check';
import Last from './Overlay/Last';
import ColumnNumber from './Overlay/ColumnNumber';
import Overlay from './Overlay/Overlay';
import RowLetter from './Overlay/RowLetter';
import { Square } from '../../../../Models/Square';

//LIBRARY IMPORTS
import * as Chess from 'chess.js';
import _ from 'lodash';

//REDUX IMPORTS
import { connect } from 'react-redux';
import {boardReducer} from '../../../../Redux/boardReducer';
import { rootReducer } from './../../../../Redux/rootReducer';

interface Props {
	app: State;
	board: Board;
	piece: Piece;
	square: Square;
	squareColor: string;
	setClickedPiece: Function;
	setPossibleSquares: Function;
	setBoardState: Function;
	addMoveToHistory : Function;
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
		const squareFrom = props.app.clickedPiece;
		const possibleSquares = props.app.possibleSquares;

		if (isSameSquare(squareFrom, props.square)) {
			resetSquare();
		}

		if (includeSquare(possibleSquares, props.square) && canMove(chess, squareFrom, props.square)) {
			const boardState: Board = {
				fen: chess.fen(),
				pgn: chess.pgn(),
				checkmate: chess.in_checkmate(),
				inCheck: chess.in_check(),
				notation: chess.history().slice(-1)[0],
				turn: chess.turn() === "w" ? "b" : "w",
				lastSquares: { from: squareFrom, to: props.square },
			};
			props.setBoardState(boardState);
			props.addMoveToHistory(boardState);
			resetSquare();
		}
	};

	return (
		<div className="col p-0" onClick={movePiece} key={props.piece} style={{ zIndex: 0, backgroundColor: props.squareColor }}>

			<Check inCheck={props.board.inCheck}
				piece={props.piece}
				turn={props.board.turn} />

			<Last lastSquares={props.board.lastSquares}
				square={props.square}
				possibleSquares={props.app.possibleSquares} />

			<ColumnNumber square={props.square}
				squareColor={boardSettings.inverseSquareColor(props.squareColor)} />

			<RowLetter square={props.square}
				squareColor={boardSettings.inverseSquareColor(props.squareColor)} />

			<Overlay board={props.board}
				app={props.app}
				square={props.square}
				squareColor={props.squareColor}
				piece={props.piece} />

			<BoardPiece piece={props.piece} square={props.square} />
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		board: state.board,
		app: state.app
	};
};

export default connect(mapStateToProps, {...rootReducer.actions,...boardReducer.actions})(BoardSquare);
