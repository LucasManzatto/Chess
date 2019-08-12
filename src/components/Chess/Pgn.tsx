//REACT IMPORTS
import React from 'react';

// MATERIAL IMPORTS
import {Typography }from '@material-ui/core';

interface Props{
	pgn: string;
}
const Pgn = (props:Props) => {
	return (
		<Typography align="left" color="secondary">
			PGN: {props.pgn}
		</Typography>
	);
};
export default Pgn;
