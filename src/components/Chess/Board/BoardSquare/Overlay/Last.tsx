//REACT IMPORTS
import React, { Fragment } from 'react';

//PROJECT IMPORTS
import { LastSquares } from '../../../../../Models/LastSquares';
import { Square } from '../../../../../Models/Square';

//LIBRARY IMPORTS
import _ from 'lodash';

interface Props {
    square: Square;
    possibleSquares: Square[];
    lastSquares: LastSquares;
}

const Last = (props: Props) => {
    return (props.square === props.lastSquares.from || props.square === props.lastSquares.to) &&
        !_.includes(props.possibleSquares, props.square)
        ? (
            <div
                style={{
                    position: 'absolute',
                    margin: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: -1,
                    opacity: 0.3,
                    backgroundColor: 'yellow'
                }}
            />
        )
        : <Fragment></Fragment>
};
export default Last;