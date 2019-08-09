/* eslint-disable no-unused-vars */
import React, { useGlobal, setGlobal } from 'reactn';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import * as board from '../../board';
import { connect } from 'react-redux';
import * as Chess from 'chess.js'


import {rootReducer} from '../../Redux/rootReducer';
const {actions} = rootReducer;
const {setFen ,setBoardState} = actions;

const styles = {
	root: {
		flexGrow: 1
	}
};

interface Props{
	setBoardState : Function;
	setFen : Function;
	classes : {
		root: any;
	}
}

const NavBar = (props : Props) => {
	const { classes } = props;
	const resetar = () => {
		const chess = new Chess();
		props.setBoardState({
			fen: chess.fen(),
			pgn : chess.pgn(),
			turn: chess.turn(),
			checkmate: chess.in_checkmate(),
			inCheck : chess.in_check(),
			lastSquares: { },
			possibleSquares: [],
			jogadas: []
		});
		//board.chess.load(board.startPosition);
	};
	const loadPgn = () => {
		props.setFen('rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2')
		board.chess.load_pgn('1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5');
		//setFen(board.chess.fen());
	};
	return (
		<div className={classes.root}>
			<AppBar elevation={0} position="static" style={{ width: '100%' }}>
				<Toolbar>
					<div className="col-1">
						<Typography variant="h6" color="secondary">
							Xadrez
						</Typography>
					</div>
					<div className="offset-1 col-1 mt-1">
						<Button onClick={() => resetar()} color="secondary">
							Resetar
						</Button>
					</div>
					{/* <div className="offset-2 col-1 mt-1">
						<Button onClick={() => loadPgn()} color="secondary">
							Load PGN
						</Button>
					</div> */}
				</Toolbar>
			</AppBar>
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return ({
		fen: state.board.fen
	});
};
export default connect(mapStateToProps, {setFen,setBoardState})(withStyles(styles)(NavBar));
