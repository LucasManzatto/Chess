import React from 'react';
import {Typography }from '@material-ui/core';

const Pgn = (props) => {
	return (
		<Typography align="left" color="secondary">
			PGN: {props.pgn}
		</Typography>
	);
};
export default Pgn;
