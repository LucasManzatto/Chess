// REACT IMPORTS
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

// MATERIAL IMPORTS
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { Typography } from '@material-ui/core';

//PROJECT IMPORTS
import * as boardSettings from '../../../board';
import { Board } from '../../../Models/Board';

//LIBRARY IMPORTS
import _ from 'lodash';

//REDUX IMPORTS
import { boardReducer } from '../../../Redux/boardReducer';
import { rootReducer, IRootReducer } from './../../../Redux/rootReducer';

interface Props {
	move: Board;
	rootActions : IRootReducer;
	setBoardState: Function;
	setClickedPiece : Function;
	setPossibleSquares : Function;
}

const isPawnMove = (notation: string) => notation.length === 2;

const getASCIIMoveNotation = (notation: string) => {
	if (isPawnMove(notation)) {
		return notation;
	}
	const piece = notation.charAt(0);
	let pieceAsciiImg = boardSettings.findPiece(piece).asciiImg;
	return _.replace(notation, piece, pieceAsciiImg);
};


const Move = (props: Props) => {
	const goToMove = (move: Board) => {
		props.setBoardState(move);
		props.rootActions.clearBoard();
	};

	return props.move === undefined
		?
		<Fragment></Fragment>
		:
		<ListItem button onClick={() => goToMove(props.move)}>
			<ListItemText
				primary={
					<Typography align="center" color="secondary">
						{getASCIIMoveNotation(props.move.notation)}
					</Typography>
				}
			/>
		</ListItem>
};

const mapStateToProps = (state: any) => {
	return { boardHistory: state.app.boardHistory };
};

export default connect(mapStateToProps, { ...boardReducer.actions, ...rootReducer.actions })(Move);