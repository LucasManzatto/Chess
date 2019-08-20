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
import { Board } from '../../../Models/Board';
import { State } from '../../../Models/State';

// LIBRARIES IMPORT
import _ from 'lodash';
import * as Chess from 'chess.js';

//REDUX IMPORTS
import { boardReducer,BoardReducerActions } from '../../../Redux/boardReducer';
import { rootReducer,RootReducerActions } from './../../../Redux/rootReducer';
import { Square } from '../../../Models/Square';

interface Props extends BoardReducerActions,RootReducerActions {
	moves: Board[]
	fen: string;
}

const createMoves = (moves: Board[]) => {
	const movesGrouped = _.groupBy(moves, (move: Board) => move.turn);
	return _.zip(movesGrouped.w, movesGrouped.b);
};

const Moves = (props:Props) =>{
	const movesZip = createMoves(props.moves);

	const rewindMove = () =>{
		const lastMove :Board= _.find(props.moves,(move: Board) => move.fen === props.fen);
		props.setBoardState(lastMove);
		props.clearBoard();

	}
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
					{movesZip.map((movesRow: Board[], turnNumber: number) => {
						const whiteMove = movesRow[0];
						const blackMove = movesRow[1];
						return (
							<div key={whiteMove.fen} className="row align-items-center no-gutters">
								<div className="col-2">
									<Typography align="center" color="secondary">
										{`${turnNumber + 1}.`}
									</Typography>
								</div>
								<div className="col-5">
									<Move move={whiteMove} turnNumber={turnNumber + 1} />
								</div>
								<div className="col-5">
									<Move move={blackMove} turnNumber={turnNumber + 2}/>
								</div>
							</div>
						);
					})}
				</List>
			</Paper>
			<div className="row justify-content-center">
				<div className="col-5">
					<FastRewind onClick={rewindMove} color="secondary" cursor="pointer" />
				</div>
				<div className="col-5">
					<FastForward color="secondary" cursor="pointer" />
				</div>
			</div>
		</div>

	);
}

// Moves.propTypes = {
// 	classes: PropTypes.string.isRequired
// };

const mapStateToProps = (state: any) => {
	const board: Board = state.board;
	const app : State = state.app;
	return { moves: app.boardHistory , fen: board.fen};
};

export default connect(mapStateToProps, { ...boardReducer.actions,...rootReducer.actions })(Moves);
