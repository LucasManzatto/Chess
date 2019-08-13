//REACT IMPORTS
import React from 'react';

//PROJECT IMPORTS
import * as boardSettings from '../../../board';
import BoardSquare from './BoardSquare/BoardSquare';

// LIBRARY IMPORTS
import _ from 'lodash';

//REDUX IMPORTS
import { connect } from 'react-redux';

const lightSquare = '#F1D9B7';
const darkSquare = '#B28A63';
let squareColor = darkSquare;

interface Props{
	fen: string
}

const Board = (props: Props) => {
	let fullFen : string = _.split(props.fen, ' ');
	let fenBoard : string[]= _.split(fullFen[0], '/');
	let position = 0;
	let rowNumber = 8;

	const renderCell = (piece: string) => {
		squareColor = squareColor === lightSquare ? darkSquare : lightSquare;
		return (
			<BoardSquare
				key={boardSettings.positions[position]}
				piece={piece}
				squareColor={squareColor}
				square={boardSettings.positions[position++]}
			/>
		);
	};

	const renderEmptySquares = (squaresNumber:number) => _.map(_.repeat(' ',squaresNumber), () => renderCell(''));

	const fenIsEmptySquares = (square: string) => _.isNumber(parseInt(square)) && !_.isNaN(parseInt(square));

	return fenBoard.map(boardRow => {
		squareColor = squareColor === lightSquare ? darkSquare : lightSquare;
		let boardSquares : string[] = _.split(boardRow, '');
		return (
			<div key={rowNumber--} className="row justify-content-center" style={{ height: '12.5%' }}>
				{boardSquares.map((square) => {
					return fenIsEmptySquares(square)
						? renderEmptySquares(parseInt(square))
						: renderCell(square);
				})}
			</div>
		);
	});
};

const mapStateToProps = (state:any) => {
	return { fen: state.board.fen };
};

export default connect(mapStateToProps, {})(Board);
