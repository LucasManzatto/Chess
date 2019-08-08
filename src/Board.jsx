/* eslint-disable no-unused-vars */
import React, { useGlobal } from 'reactn';
import { connect } from 'react-redux';

import Cell from './Cell';

import * as boardSettings from './board.js';
import _ from 'lodash';

const lightSquare = '#F1D9B7';
const darkSquare = '#B28A63';
let cor = darkSquare;

const Board = (props) => {
	const { fen } = props;
	let fullFen = _.split(fen, ' ');
	let fenBoard = _.split(fullFen[0], '/');
	let position = 0;
	let rowNumber = 8;

	const renderCell = (piece) => {
		cor = cor === lightSquare ? darkSquare : lightSquare;
		return (
			<Cell
				key={boardSettings.positions[position]}
				piece={piece}
				cor={cor}
				corInversa={cor === lightSquare ? darkSquare : lightSquare}
				cell={piece}
				square={boardSettings.positions[position++]}
			/>
		);
	};
	return fenBoard.map(boardRow => {
		cor = cor === lightSquare ? darkSquare : lightSquare;
		let squares = _.split(boardRow, '');
		return (
			<div key={rowNumber--} className="row justify-content-center" style={{ height: '12.5%' }}>
				{squares.map((square) => {
					const isEmptySquares = _.isNumber(parseInt(square)) && !_.isNaN(parseInt(square));
					//checa se é um numero e adiciona os campos vazios
					return isEmptySquares
						? //Cria o numero de quadrados vazios a partir do FEN
							_.map(_.repeat(' ', parseInt(square)), () => renderCell(''))
						: //senao adiciona a peça no quadrado
							renderCell(square);
				})}
			</div>
		);
	});
};

const mapStateToProps = (state) => {
	return { fen: state.board.fen };
};

export default connect(mapStateToProps, {})(Board);
