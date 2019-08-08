/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import Piece from './Piece';
import * as boardSettings from './board.js';
import * as Chess from 'chess.js';
import _ from 'lodash';
import { Typography } from '@material-ui/core';

import {rootReducer }from './Redux/rootReducer';
const {actions} = rootReducer;
const { setPossibleSquares, setClickedPiece, setBoardState }  = actions;

const Cell = (props) => {
	const { board, piece, square ,cor} = props;

	const isSameSquare = (from, to) => from === to;
	const canMove = (chess, from, to) => chess.move({ from, to, promotion: 'q' }) != null;

	const canRenderShortCastle = (possibleSquares, turn, square) =>
		_.includes(possibleSquares, 'O-O') && (turn === 'w' ? /([fg]1)/.test(square) : /([fg]8)/.test(square));

	const canRenderLongCastle = (possibleSquares, turn, square) =>
		_.includes(possibleSquares, 'O-O-O') && (turn === 'w' ? /([bcd]1)/.test(square) : /([bcd]8)/.test(square));

	const resetSquare = () => {
		props.setClickedPiece('');
		props.setPossibleSquares([]);
	};
	const includeSquare = (possibleSquares, square) => {
		return (
			_.includes(possibleSquares, square) ||
			_.includes(possibleSquares, 'O-O') ||
			_.includes(possibleSquares, 'O-O-O')
		);
	};

	const movePiece = () => {
		const chess = new Chess();
		chess.load_pgn(props.board.pgn);
		const squareFrom = board.clickedPiece;
		const possibleSquares = board.possibleSquares;

		if (isSameSquare(squareFrom, square)) {
			resetSquare(squareFrom, square);
		}

		if (includeSquare(possibleSquares, square) && canMove(chess, squareFrom, square)) {
			const novasJogadas = [];
			novasJogadas.push({
				fen: chess.fen(),
				jogada: chess.history().slice(-1),
				turno: board.turn,
				posicao: { from: squareFrom, to: square }
			});
			// const turno = chess.turn();
			// const AImove = getBestMove(chess)
			// const move = chess.move(AImove)
			// novasJogadas.push({
			// 	fen: chess.fen(),
			// 	jogada: chess.history().slice(-1),
			// 	turno,
			// 	posicao: { from: AImove.from, to: AImove.to }
			// });
			// //AI
			// boardSettings.chess.move(_.sample(boardSettings.chess.moves()));
			// novasJogadas.push({ fen: boardSettings.chess.fen(), jogada: boardSettings.chess.history().slice(-1).pop() });
			props.setBoardState({
				fen: chess.fen(),
				pgn: chess.pgn(),
				turn: chess.turn(),
				checkmate: chess.in_checkmate(),
				inCheck: chess.in_check(),
				lastSquares: { from: squareFrom, to: square },
				possibleSquares: [],
				jogadas: board.jogadas.concat(novasJogadas)
			});
		}
	};

	const renderInCheck = () => {
		if (
			board.inCheck &&
			((board.turn === 'w' && piece === boardSettings.pieces.white.king.name) ||
				(board.turn === 'b' && piece === boardSettings.pieces.black.king.name))
		) {
			return (
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
			);
		}
	};

	const RenderLast = () => {
		if (
			(square === board.lastSquares.from || square === board.lastSquares.to) &&
			!_.includes(board.possibleSquares, square)
		) {
			return (
				<div
					style={{
						position: 'absolute',
						margin: 0,
						height: '100%',
						width: '100%',
						zIndex: -1,
						opacity: 0.3,
						backgroundColor: 'yellow'
					}}
				/>
			);
		}
	};

	const renderColNumbers = () => {
		return (
			/(h)/.test(square) && (
				<div
					style={{
						pointerEvents: 'none',
						position: 'absolute',
						marginTop: '25%',
						marginBottom: '25%',
						marginLeft: '75%',
						zIndex: 5,
						opacity: 0.8
					}}
				>
					<Typography style={{ color: props.corInversa }}>{square.charAt(1)}</Typography>
				</div>
			)
		);
	};

	const renderRowLetters = () => {
		return (
			/(1)/.test(square) && (
				<div
					style={{
						pointerEvents: 'none',
						position: 'absolute',
						bottom: 0,
						zIndex: 5,
						opacity: 0.8
					}}
				>
					<Typography style={{ color: props.corInversa }}>{square.charAt(0)}</Typography>
				</div>
			)
		);
	};

	const renderOverlay = (board, color) => {
		if (
			_.includes(board.possibleSquares, square) ||
			canRenderShortCastle(board.possibleSquares, board.turn, square) ||
			canRenderLongCastle(board.possibleSquares, board.turn, square)
		) {
			if (piece === '') {
				return (
					<div
						style={{
							position: 'absolute',
							borderRadius: 50,
							margin: '37.5%',
							height: '25%',
							width: '25%',
							zIndex: -1,
							opacity: 0.5,
							backgroundColor: color
						}}
					/>
				);
			} else {
				return (
					<div
						style={{
							opacity: 0.5,
							zIndex: -5,
							height: '100%',
							width: '100%',
							position: 'absolute',
							backgroundColor: 'green'
						}}
					>
						<div
							style={{
								position: 'absolute',
								borderRadius: 25,
								height: '100%',
								width: '100%',
								zIndex: 1,
								opacity: 1,
								backgroundColor: cor
							}}
						/>
					</div>
				);
			}
		}
	};

	return (
		<div className="col p-0" onClick={movePiece} key={props.cell} style={{ zIndex: 0, backgroundColor: cor }}>
			{renderInCheck()}
			{RenderLast()}
			{renderOverlay(board, 'green')}
			{renderColNumbers()}
			{renderRowLetters()}
			{piece !== '' && <Piece piece={boardSettings.findPiece(piece)} square={square} />}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		board: state.board
	};
};
export default connect(mapStateToProps, { setPossibleSquares, setClickedPiece, setBoardState })(Cell);
