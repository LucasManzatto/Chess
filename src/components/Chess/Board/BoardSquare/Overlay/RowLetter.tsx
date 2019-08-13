//REACT IMPORTS
import React, { Fragment } from "react";

//MATERIAL IMPORTS
import { Typography } from "@material-ui/core";

//PROJECT IMPORTS
import { Square } from "../../../../../Models/Board";

interface Props {
    square: Square;
    squareColor: string;
}

const RowLetter = (props: Props) => {
    return /(1)/.test(props.square)
        ? (
            <div
                style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 5,
                    opacity: 0.8
                }}
            >
                <Typography style={{ color: props.squareColor }}>{props.square.charAt(0)}</Typography>
            </div>
        )
        : <Fragment></Fragment>
};
export default RowLetter;