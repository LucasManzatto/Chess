// REACT IMPORTS
import React from 'reactn';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// MATERIAL IMPORTS
import { withStyles } from '@material-ui/core/styles';
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
const {actions} = rootReducer;
const { setBoardState } = actions;

const pecasImg = [
	{
		letra: 'N',
		pecaWhite: '♘',
		pecaBlack: '♞'
	},
	{
		letra: 'K',
		pecaWhite: '♔',
		pecaBlack: '♚'
	},
	{
		letra: 'Q',
		pecaWhite: '♕',
		pecaBlack: '♛'
	},
	{
		letra: 'R',
		pecaWhite: '♖',
		pecaBlack: '♜'
	},
	{
		letra: 'B',
		pecaWhite: '♗',
		pecaBlack: '♝'
	}
];



const criarJogadas = (jogadas) => {
	let jogadasWhite = [];
	let jogadasBlack = [];
	jogadas.map((jogada) => (jogada.turno === 'w' ? jogadasWhite.push(jogada) : jogadasBlack.push(jogada)));
	return _.zip(jogadasWhite, jogadasBlack);
};

const getNotationString = (jogadaObj) => {
	if (jogadaObj === undefined) return;
	const jogada = jogadaObj.jogada;
	const cor = jogada.turno;
	const letra = _.split(jogada, '')[0];
	let pecaImg = _.find(pecasImg, { letra });
	return pecaImg !== undefined
		? _.replace(jogada, letra, cor === 'w' ? pecaImg.pecaWhite : pecaImg.pecaBlack)
		: jogada;
};

function Moves(props:any) {
	const { jogadas: moves } = props;
	let turnNumber = 1;
	const movesZip = criarJogadas(moves);
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
							Jogadas
						</ListSubheader>
					}
				>
					{movesZip.map((movesRow) => {
						const whiteMove = movesRow[0];
						const blackMove = movesRow[1];
						console.log(whiteMove)
						const whiteMoveNotation = getNotationString(whiteMove);
						const blackMoveNotation = getNotationString(blackMove);
						return (
							<div key={whiteMove} className="row align-items-center no-gutters">
								<div className="col-2">
									<Typography align="center" color="secondary">
										{`${turnNumber++}.`}
									</Typography>
								</div>
								<div className="col-5">
									<Move move={whiteMove} moveNotation={whiteMoveNotation} />
								</div>
								<div className="col-5">
									{blackMove !== undefined && (
										<Move move={blackMove} moveNotation={blackMoveNotation} />
									)}
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
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state:any) => {
	return { jogadas: state.board.jogadas };
};

export default connect(mapStateToProps, {setBoardState })(Moves);
