// REACT IMPORTS
import React from 'reactn';
import { connect } from 'react-redux';

// MATERIAL IMPORTS
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { Typography } from '@material-ui/core';

//REDUX IMPORTS
import {rootReducer} from '../../../Redux/rootReducer';
const {actions} = rootReducer;
const { setFen, setLastSquares, setPossibleSquares } = actions;

const Move = ({ move, moveNotation ,props}) => {

	const goToMove = (move) => {
        props.setFen(move.fen);
        props.setLastSquares(move.posicao);
        props.setPossibleSquares([]);
    };

	return (
		<ListItem button onClick={() => goToMove(move)}>
			<ListItemText
				primary={
					<Typography align="center" color="secondary">
						{moveNotation}
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