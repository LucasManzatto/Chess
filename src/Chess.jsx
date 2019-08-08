import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Board from './Board.jsx';

import Jogadas from './Jogadas';

import Openings from './Openings';
import { withStyles } from '@material-ui/core/styles';

import Pgn from './Pgn';
import Fen from './Fen';

const styles = {};

const Chess = (props) => {
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
						<Jogadas />
					</div>
				</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return { board: state.board };
};

export default connect(mapStateToProps, {})(withStyles(styles)(Chess));
