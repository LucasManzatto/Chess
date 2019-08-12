//REACT IMPORTS
import React from 'react';

//MATERIAL IMPORTS
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';

//LIBRARY IMPORTS
import _ from 'lodash';

//PROJECT IMPORTS
import AddOpening from './AddOpening';
import OpeningItem from './OpeningItem';

//REDUX IMPORTS
import { connect } from 'react-redux';
import {rootReducer }from '../../../Redux/rootReducer';
const {actions} = rootReducer;
const { setFen, setJogadas}  = actions;

const Openings = (props: any) => {
	const { openings} = props;

	return (
		<Paper elevation={0} square={true}>
			<List
				color="primary"
				component="nav"
				subheader={
					<ListSubheader
						component="div"
						style={{ backgroundColor: grey[900], color: 'white', pointerEvents: 'none' }}
					>
						Lista Openings
					</ListSubheader>
				}
			>
				{_.map(openings, (opening: { name: string | number | undefined; }) => <OpeningItem key={opening.name} opening={opening} />)}
			</List>
			<AddOpening texto={'Add Opening'} variation={false} />
		</Paper>
	);
};

const mapStateToProps = (state : any) => {
	return {
		jogadas: state.board.jogadas,
		openings: state.board.openings,
		subOpenings: state.board.subOpenings
	};
};

export default connect(mapStateToProps, { setFen, setJogadas })(Openings);
