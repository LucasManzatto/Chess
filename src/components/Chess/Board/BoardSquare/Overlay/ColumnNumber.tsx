//REACT IMPORTS
import React, { Fragment, CSSProperties } from "react";

//MATERIAL IMPORTS
import { Typography } from "@material-ui/core";

//PROJECT IMPORTS
import { Square } from "../../../../../Models/Square";

interface Props {
	square: Square;
	squareColor: string;
}

const isHColumn = (square: Square) => /(h)/.test(square);

const ColumnNumber = (props: Props) => {
	const columnNumberStyle: CSSProperties = {
		pointerEvents: 'none',
		position: 'absolute',
		marginLeft: '80%',
		zIndex: -1,
		opacity: 0.8,
		color: props.squareColor,
		fontWeight: 'bold',
		fontSize: 'small'
	};

	return isHColumn(props.square)
		? <Typography className="remove-user-select" style={columnNumberStyle}>{props.square.charAt(1)}</Typography>
		: <Fragment></Fragment>
};
export default ColumnNumber;