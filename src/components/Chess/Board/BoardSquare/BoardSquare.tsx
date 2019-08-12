//REACT IMPORTS
import React from 'react';

//MATERIAL IMPORTS
import { Typography } from '@material-ui/core';

//PROJECT IMPORTS
import BoardPiece from './BoardPiece/BoardPiece';
import { Board } from '../../../../Models/Board';
import { Move } from '../../../../Models/Move';
import * as boardSettings from '../../../../board';

//LIBRARY IMPORTS
import * as Chess from 'chess.js';
import _ from 'lodash';

//REDUX IMPORTS
import { connect } from 'react-redux';
import { rootReducer } from '../../../../Redux/rootReducer';
import InCheck from './InCheck';
import Last from './Last';
import ColumnNumber from './ColumnNumber';
import Overlay from './Overlay';
import RowLetter from './RowLetter';
const { actions } = rootReducer;
const { setPossibleSquares, setClickedPiece, setBoardState } = actions;


const lightSquare = '#F1D9B7';
const darkSquare = '#B28A63';

interface Props {
	board: Board;
	piece: string;
	square: string;
	squareColor: string;
	setClickedPiece: Function;
	setPossibleSquares: Function;
	setBoardState: Function;
}

const BoardSquare = (props: Props) => {

	const isSameSquare = (from: string, to: string) => from === to;

	const canMove = (chess: any, from: string, to: string) => chess.move({ from, to, promotion: 'q' }) != null;

	const resetSquare = () => {
		props.setClickedPiece('');
		props.setPossibleSquares([]);
	};

	const includeSquare = (possibleSquares: string[], square: string) => {
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

			<InCheck inCheck={props.board.inCheck}
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
