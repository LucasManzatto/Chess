/* eslint-disable no-unused-vars */
import React, { useGlobal } from 'reactn';
import { connect } from 'react-redux';

import BoardCell from './BoardCell';

import * as boardSettings from '../../../board';
import _ from 'lodash';

const lightSquare = '#F1D9B7';
const darkSquare = '#B28A63';
let cor = darkSquare;

interface Props{
	fen: string
}

const Board = (props: Props) => {
	const { fen } = props;
	let fullFen : string = _.split(fen, ' ');
	let fenBoard : string[]= _.split(fullFen[0], '/');
	let position = 0;
	let rowNumber = 8;

	const renderCell = (piece: string) => {
		cor = cor === lightSquare ? darkSquare : lightSquare;
		return (
			<BoardCell
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
		let squares : string[] = _.split(boardRow, '');
		return (
			<div key={rowNumber--} className="row justify-content-center" style={{ height: '12.5%' }}>
				{squares.map((piece) => {
					const isEmptySquares = _.isNumber(parseInt(piece)) && !_.isNaN(parseInt(piece));
					//checa se é um numero e adiciona os campos vazios
					return isEmptySquares
						? //Cria o numero de quadrados vazios a partir do FEN
							_.map(_.repeat(' ', parseInt(piece)), () => renderCell(''))
						: //senao adiciona a peça no quadrado
							renderCell(piece);
				})}
			</div>
		);
	});
};

const mapStateToProps = (state:any) => {
	return { fen: state.board.fen };
};

export default connect(mapStateToProps, {})(Board);
