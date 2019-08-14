// REACT IMPORTS
import React from 'react';
import { connect } from 'react-redux';

// MATERIAL IMPORTS
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { Typography } from '@material-ui/core';

//PROJECT IMPORTS
import * as boardSettings from '../../../board';

//LIBRARY IMPORTS
import _ from 'lodash';
import * as Chess from 'chess.js';

//REDUX IMPORTS
import {rootReducer} from '../../../Redux/rootReducer';
import { Board} from '../../../Models/Board';
import { Fragment } from 'react';
const {actions} = rootReducer;
const { setFen, setLastSquares, setPossibleSquares,setBoardState } = actions;

interface Props{
	move : Board;
	moveNotation : string;
	setFen: Function;
	setLastSquares : Function;
	setPossibleSquares: Function;
	setBoardState : Function;
}

const isPawnMove = (notation:string) => notation.length === 2;

const getASCIIMoveNotation = (notation: string) => {
	if(isPawnMove(notation)){
		return notation;
	}
	const piece = notation.charAt(0);
	let pieceAsciiImg = boardSettings.findPiece(piece).asciiImg;
	return _.replace(notation, piece, pieceAsciiImg);
};


const Move = (props : Props) => {

	const goToMove = (move : Board) => {
		const chess = new Chess(move.fen);
		props.setBoardState({
			fen: chess.fen(),
			pgn: chess.pgn(),
			turn: chess.turn(),
			checkmate: chess.in_checkmate(),
			inCheck: chess.in_check(),
			lastSquares: move.lastSquares,
			possibleSquares: [],
		});
	};

	return props.move === undefined ? <Fragment></Fragment> :
	(
		<ListItem button onClick={() => goToMove(props.move)}>
			<ListItemText
				primary={
					<Typography align="center" color="secondary">
						{getASCIIMoveNotation(props.move.notation)}
					</Typography>
				}
			/>
		</ListItem>
	);
};

const mapStateToProps = (state:any) => {
	return state;
};

export default connect(mapStateToProps, { setFen, setLastSquares, setPossibleSquares ,setBoardState})(Move);