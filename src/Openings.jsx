/* eslint-disable no-unused-vars */
import React from 'react';

import { connect } from 'react-redux';
import { setFen, setJogadas } from './Redux/actions';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';
import AddOpening from './AddOpening';
import ItemOpening from './ItemOpening';
import grey from '@material-ui/core/colors/grey';

const Openings = (props) => {
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
				{_.map(openings, (opening) => <ItemOpening key={opening.name} opening={opening} />)}
			</List>
			<AddOpening texto={'Add Opening'} variation={false} />
		</Paper>
	);
};

const mapStateToProps = (state) => {
	return {
		jogadas: state.board.jogadas,
		openings: state.board.openings,
		subOpenings: state.board.subOpenings
	};
};

export default connect(mapStateToProps, { setFen, setJogadas })(Openings);
