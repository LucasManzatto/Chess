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

const isFirstSquare = (square: Square) => /(1)/.test(square);

const RowLetter = (props: Props) => {
    const letterStyle: CSSProperties = {
        pointerEvents: 'none',
        position: 'absolute',
        bottom: 0,
        zIndex: 5,
        opacity: 0.8,
        color: props.squareColor,
        fontWeight: 'bold',
        fontSize: "small"
    };

    return isFirstSquare(props.square)
        ? <Typography style={letterStyle}>{props.square.charAt(0)}</Typography>
        : null;
};
export default RowLetter;