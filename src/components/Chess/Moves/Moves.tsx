// REACT IMPORTS
import React from 'reactn';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// MATERIAL IMPORTS
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import FastForward from '@material-ui/icons/FastForward';
import FastRewind from '@material-ui/icons/FastRewind';
import grey from '@material-ui/core/colors/grey';
import { Typography } from '@material-ui/core';

// PROJECT IMPORTS
import Move from './Move';

// LIBRARIES IMPORT
import _ from 'lodash';

//REDUX IMPORTS
import {rootReducer} from '../../../Redux/rootReducer';
import { Move as MoveModel } from '../../../Models/Move';
const {actions} = rootReducer;
const { setBoardState } = actions;

interface Props{
	moves : MoveModel[]
}

const createMoves = (moves : MoveModel[]) => {
	const movesGrouped = _.groupBy(moves,(move: MoveModel) => move.turn);
	return _.zip(movesGrouped.w, movesGrouped.b);
};

function Moves(props:Props) {
	let turnNumber = 1;
	const movesZip = createMoves(props.moves);
	return (
		<div className="col">
			<Paper elevation={0} square={true} className="mt-3" style={{ width: '100%', minWidth: '100%' }}>
				<List
					component="nav"
					subheader={
						<ListSubheader
							component="div"
							style={{ backgroundColor: grey[900], color: 'white', pointerEvents: 'none' }}
						>
							Moves
						</ListSubheader>
					}
				>
					{movesZip.map((movesRow : MoveModel[]) => {
						const whiteMove = movesRow[0];
						const blackMove = movesRow[1];
						return (
							<div key={whiteMove.fen} className="row align-items-center no-gutters">
								<div className="col-2">
									<Typography align="center" color="secondary">
										{`${turnNumber++}.`}
									</Typography>
								</div>
								<div className="col-5">
									<Move move={whiteMove} />
								</div>
								<div className="col-5">
									<Move move={blackMove} />
								</div>
							</div>
					);
					})}
				</List>
			</Paper>
			<div className="row justify-content-center">
				<div className="col-5">
					<FastRewind color="secondary" cursor="pointer" />
				</div>
				<div className="col-5">
					<FastForward color="secondary" cursor="pointer" />
				</div>
			</div>
		</div>

	);
}

Moves.propTypes = {
	classes: PropTypes.string.isRequired
};

const mapStateToProps = (state:any) => {
	return { jogadas: state.board.jogadas };
};

export default connect(mapStateToProps, {setBoardState })(Moves);
