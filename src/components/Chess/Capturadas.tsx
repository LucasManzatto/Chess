import React from 'reactn';
import _ from 'lodash';
import * as board from '../../board.jsx';

interface Props{
	pecas: string[];
}

interface BoardPiece{
	name: string;
	img: string;
}

const Capturadas = (props: Props) => {
	return props.pecas.map((piece) => {
		const boardPiece: BoardPiece= board.findPiece(piece);
		return <img key={boardPiece.name} alt="" height={'100%'} src={boardPiece.img} />;
	});
};

export default Capturadas;
