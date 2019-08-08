import React from 'reactn';
import _ from 'lodash';
import * as board from './board.js';

const Capturadas = ({ pecas }) => {
	return pecas.map((piece) => {
		const boardPiece = board.findPiece(piece);
		return <img key={boardPiece} alt="" height={'100%'} src={boardPiece.img} />;
	});
};

export default Capturadas;
