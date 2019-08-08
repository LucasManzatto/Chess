import React from 'react';
import { Typography } from '@material-ui/core';

const Fen = (props) => {
	return (
		<Typography align="left" color="secondary">
			FEN: {props.fen}
		</Typography>
	);
};
export default Fen;
