/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from 'reactn';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import AddOpening from './AddOpening';

import * as Chess from 'chess.js';
import _ from 'lodash';
import { Typography, Button } from '@material-ui/core';

import {rootReducer }from '../../../Redux/rootReducer';
const {actions} = rootReducer;
const { setFen, setJogadas, setPgn, setBoardState }  = actions;

const OpeningItem = (props:any) => {
	const [ open, setOpen ] = useState(false);
	const { opening, setPgn, setBoardState } = props;

	function handleClick(pgn) {
		let move;
		const chess = new Chess();
		chess.load_pgn(pgn);
		const chessAux = new Chess();
		let jogadas = [];
		chess.history().map((jogada) => {
			const turno = chessAux.turn();
			move = chessAux.move(jogada);
			jogadas.push({
				fen: chessAux.fen(),
				jogada,
				turno,
				posicao: { from: move.from, to: move.to }
			});
			return jogada;
		});
		setBoardState({
			fen: chess.fen(),
			turn: chess.turn(),
			checkmate: chess.in_checkmate(),
			inCheck: chess.in_check(),
			lastSquares: { from: move.from, to: move.to },
			possibleSquares: [],
			jogadas
		});
		setPgn(pgn);
		// setJogadas(jogadas);
		// // _.split(chess.pgn(), /([0-9]. )/).map((item) => {
		// // 	if (!/([0-9]. )/.test(item) && item !== '') {
		// // 		jogadas.push(_.split(_.trimEnd(item), ' ').map((jogada) => jogada));
		// // 	}
		// // });
		// setFen(chess.fen());
	}

	const SubOpening = ({ subOpenings, openingName }) => {
		return (
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div">
					{_.map(subOpenings, (subOpening) => (
						<ListItem
							style={{ paddingLeft: 30 }}
							button
							key={subOpening.name}
							onClick={() => {
								handleClick(subOpening.pgn);
							}}
						>
							<ListItemText primary={<Typography color="secondary">{subOpening.name}</Typography>} />
						</ListItem>
					))}
				</List>
				<AddOpening texto={'Add Variation'} variation={true} openingName={openingName} />
			</Collapse>
		);
	};

	return (
		<Fragment>
			<div className="row align-items-center">
				<div className="col-10 pr-0">
					<ListItem
						button
						key={opening.name}
						onClick={() => {
							handleClick(opening.pgn);
						}}
					>
						<ListItemText
							key={opening.name}
							primary={<Typography color="secondary">{opening.name}</Typography>}
						/>
					</ListItem>
				</div>
				<div className="col-2 pl-0">
					{open ? (
						<ExpandLess
							onClick={() => {
								setOpen(!open);
							}}
							cursor="pointer"
							color="secondary"
						/>
					) : (
						<ExpandMore
							onClick={() => {
								setOpen(!open);
							}}
							cursor="pointer"
							color="secondary"
						/>
					)}
				</div>
			</div>
			<SubOpening subOpenings={opening.subOpenings} openingName={opening.name} />
		</Fragment>
	);
};

const mapStateToProps = (state:any) => {
	return {
		jogadas: state.board.jogadas,
		openings: state.board.openings
	};
};

export default connect(mapStateToProps, { setFen, setJogadas, setPgn, setBoardState })(OpeningItem);
