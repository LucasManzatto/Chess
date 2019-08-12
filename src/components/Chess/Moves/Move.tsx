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

//REDUX IMPORTS
import {rootReducer} from '../../../Redux/rootReducer';
import { Move as MoveModel } from '../../../Models/Move';
import { Fragment } from 'react';
const {actions} = rootReducer;
const { setFen, setLastSquares, setPossibleSquares } = actions;

interface Props{
	move : MoveModel;
	moveNotation : string;
	setFen: Function;
	setLastSquares : Function;
	setPossibleSquares: Function;
}

const getMoveNotation = (moveObj: MoveModel) => {
	const moveNotation = moveObj.jogada;
	const piece = _.split(moveNotation, '')[0];
	let pieceImage = boardSettings.findPiece(piece).asciiImg;
	return pieceImage !== ""
		? _.replace(moveNotation, piece, pieceImage)
		: moveNotation;
};


const Move = (props : Props) => {

	const goToMove = (move : MoveModel) => {
        props.setFen(move.fen);
        props.setLastSquares(move.position);
        props.setPossibleSquares([]);
	};

	return props.move === undefined ? <Fragment></Fragment> :
	(
		<ListItem button onClick={() => goToMove(props.move)}>
			<ListItemText
				primary={
					<Typography align="center" color="secondary">
						{getMoveNotation(props.move)}
					</Typography>
				}
			/>
		</ListItem>
	);
};

const mapStateToProps = (state:any) => {
	return state;
};

export default connect(mapStateToProps, { setFen, setLastSquares, setPossibleSquares })(Move);