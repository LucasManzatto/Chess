/* eslint-disable no-unused-vars */
import React, { useGlobal, useState } from 'reactn';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FastForward from '@material-ui/icons/FastForward';
import FastRewind from '@material-ui/icons/FastRewind';
import grey from '@material-ui/core/colors/grey';

import * as Chess from 'chess.js';
import { Typography } from '@material-ui/core';
import * as boardSettings from './board.js';

import { setFen, setLastSquares, setPossibleSquares, setBoardState } from './Redux/actions';

import _ from 'lodash';

const styles = (theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3
	}
});
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

const Jogada = ({ jogada, stringJogada }) => {
	const handleClick = (jogada) => {
		if (jogada) {
			setFen(jogada.fen);
			setLastSquares(jogada.posicao);
			setPossibleSquares([]);
		}
	};
	return (
		<ListItem button onClick={() => handleClick(jogada)}>
			<ListItemText
				primary={
					<Typography align="center" color="secondary">
						{stringJogada}
					</Typography>
				}
			/>
		</ListItem>
	);
};

const criarJogadas = (jogadas) => {
	let jogadasWhite = [];
	let jogadasBlack = [];
	jogadas.map((jogada) => (jogada.turno === 'w' ? jogadasWhite.push(jogada) : jogadasBlack.push(jogada)));
	return _.zip(jogadasWhite, jogadasBlack);
};

const getStringJogada = (jogadaObj) => {
	if (jogadaObj === undefined) return;
	const jogada = jogadaObj.jogada;
	const cor = jogada.turno;
	const letra = _.split(jogada, '')[0];
	let pecaImg = _.find(pecasImg, { letra });
	return pecaImg !== undefined
		? _.replace(jogada, letra, cor === 'w' ? pecaImg.pecaWhite : pecaImg.pecaBlack)
		: jogada;
};

function Jogadas(props) {
	const { jogadas } = props;
	let counter = 1;
	const jogadasZip = criarJogadas(jogadas);
	return (
		<Paper elevation={0} square={true} className="mt-3 mr-3" style={{ width: '100%', minWidth: '100%' }}>
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
				{jogadasZip.map((jogada) => {
					const jogadaWhite = jogada[0];
					const jogadaBlack = jogada[1];
					const stringJogadaWhite = getStringJogada(jogadaWhite);
					const stringJogadaBlack = getStringJogada(jogadaBlack);
					return (
						<div key={jogadaWhite.fen} className="row">
							<div className="col-2">
								<ListItem>
									<ListItemText
										primary={
											<Typography align="center" color="secondary">
												{`${counter++}.`}
											</Typography>
										}
									/>
								</ListItem>
							</div>
							<div className="col-5 pr-0">
								<Jogada jogada={jogadaWhite} stringJogada={stringJogadaWhite} />
							</div>
							<div className="col-5 pl-0">
								{jogadaBlack !== undefined && (
									<Jogada jogada={jogadaBlack} stringJogada={stringJogadaBlack} />
								)}
							</div>
						</div>
					);
				})}
				<div className="row">
					<div className="col-6 pr-0">
						<FastRewind color="secondary" cursor="pointer" />
					</div>
					<div className="col-6 pl-0">
						<FastForward color="secondary" cursor="pointer" />
					</div>
				</div>
			</List>
		</Paper>
	);
}

Jogadas.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return { jogadas: state.board.jogadas };
};

export default connect(mapStateToProps, { setFen, setLastSquares, setPossibleSquares, setBoardState })(
	withStyles(styles)(Jogadas)
);
