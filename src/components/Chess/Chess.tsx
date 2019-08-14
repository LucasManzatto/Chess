//REACT IMPORTS
import React, { Fragment } from 'react';

//MATERIAL IMPORTS

//PROJECT IMPORTS
import Board from './Board/Board';
import Moves from './Moves/Moves';
import Pgn from './Pgn';
import Fen from './Fen';
import Openings from './Openings/Openings';
import {Board as BoardModel} from '../../Models/Board';

//LIBRARIES IMPORTS

//REDUX IMPORTS
import { connect } from 'react-redux';

interface Props{
	board: BoardModel;
}

const Chess = (props: Props) => {
	return (
		<Fragment>
				<div className="col-3 mt-3 mb-4">
					<Openings />
				</div>
				<div
					className="col-5 offset-1 mt-3"
					style={{ height: 400, width: 400, minHeight: 400, minWidth: 400, maxHeight: 400, maxWidth: 400 }}
				>
					<Board />
					<div className="row justify-content-start">
						<div className="col-12 pl-0 mt-3">
							<Pgn pgn={props.board.pgn} />
						</div>
					</div>
					<div className="row justify-content-start">
						<div className="col-12 pl-0 mt-3">
							<Fen fen={props.board.fen} />
						</div>
					</div>
				</div>
				<div className="offset-1 col-2">
					<div className="row">
						<Moves />
					</div>
				</div>
		</Fragment>
	);
};

const mapStateToProps = (state: any) => {
	return { board: state.board };
};

export default connect(mapStateToProps, {})(Chess);
