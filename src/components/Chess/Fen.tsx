import React from 'react';
import { Typography } from '@material-ui/core';

const Fen = ({fen}) => {
	return (
		<Typography align="left" color="secondary">
			FEN: {fen}
		</Typography>
	);
};
export default Fen;
