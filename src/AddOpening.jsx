import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from './Redux/actions';
import { TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import FirebaseService from './Firebase/firebaseService';

import * as Chess from 'chess.js';

const AddOpening = (props) => {
	const chess = new Chess();
	const { texto } = props;
	const [ nome, setNome ] = useState('');
	const [ pgn, setPgn ] = useState('');
	const [ open, setOpen ] = useState(false);

	function handleClickOpen() {
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}
	function handleAdd() {
		const newOpening = { name: nome, pgn, opening: props.openingName };
		if (chess.load_pgn(pgn)) {
			if (props.variation) {
				FirebaseService.addSubOpening(newOpening);
			} else {
				FirebaseService.addOpening(newOpening);
			}

			//addOpening(newOpening);
			setOpen(false);
		}
	}

	return (
		<div>
			<Button onClick={handleClickOpen} color="secondary">
				{texto}
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">
					<Typography color="secondary">{texto}</Typography>
				</DialogTitle>
				<DialogContent>
					<TextField
						InputProps={{ style: { color: 'white' } }}
						InputLabelProps={{ style: { color: 'white' } }}
						onChange={(event) => setNome(event.target.value)}
						autoFocus
						margin="dense"
						id="name"
						label="Nome"
						type="text"
						fullWidth
					/>
					<TextField
						InputProps={{ style: { color: 'white' } }}
						InputLabelProps={{ style: { color: 'white' } }}
						onChange={(event) => setPgn(event.target.value)}
						multiline
						autoFocus
						margin="dense"
						id="name"
						label="PGN"
						type="text"
						fullWidth
						error={!chess.load_pgn(pgn)}
						helperText={chess.load_pgn(pgn) ? ' ' : 'PGN Inválido!'}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						<Typography color="secondary">Cancel</Typography>
					</Button>
					<Button onClick={handleAdd} color="primary">
						<Typography color="secondary">Add</Typography>
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

const mapStateToProps = (state) => {
	return { openings: state.board.openings };
};
const mapDispatchToProps = (dispatch) => {
	return { addOpening: (newOpening) => dispatch(actions.addOpening(newOpening)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOpening);
