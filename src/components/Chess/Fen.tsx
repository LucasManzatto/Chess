//REACT IMPORTS
import React from 'react';

//MATERIAL IMPORTS
import { Typography } from '@material-ui/core';

interface Props{
	fen : string;
}

const Fen = (props: Props) => {
	return <Typography align="left" color="secondary">
		FEN: {props.fen}
	</Typography>;
};
export default Fen;
