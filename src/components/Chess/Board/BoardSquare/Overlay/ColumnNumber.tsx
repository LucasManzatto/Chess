//REACT IMPORTS
import React, { Fragment } from "react";

//MATERIAL IMPORTS
import { Typography } from "@material-ui/core";

//PROJECT IMPORTS
import { Square } from "../../../../../Models/Square";

interface Props {
	square: Square;
	squareColor: string;
}

const ColumnNumber = (props: Props) => {
	return /(h)/.test(props.square)
		? (
			<div
				style={{
					pointerEvents: 'none',
					position: 'absolute',
					marginTop: '25%',
					marginBottom: '25%',
					marginLeft: '75%',
					zIndex: 5,
					opacity: 0.8
				}}
			>
				<Typography style={{ color: props.squareColor }}>{props.square.charAt(1)}</Typography>
			</div>
		)
		: <Fragment></Fragment>
};
export default ColumnNumber;