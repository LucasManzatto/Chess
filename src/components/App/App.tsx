import React from 'reactn';
import { connect } from 'react-redux';
import './App.css';
import Chess from '../Chess/Chess';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import FirebaseService from '../../Firebase/firebaseService';

import NavBar from './AppBar';

let wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface Props {
	setOpenings : Function;
}

class App extends React.Component<Props> {
	constructor(props: Readonly<Props>) {
		super(props);
	}
	async componentDidMount() {
		// const openings = await FirebaseService.getOpenings();
		// this.props.setOpenings(openings);
	}
	render() {
		return (
			<div className="App container-fluid" style={{ height: '100vh', backgroundColor: grey[700] }}>
				<CssBaseline />
				<div className="row">
					<NavBar />
				</div>
				<div className="row">
					<Chess />
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state: any) => {
	return state;
};
export default connect(mapStateToProps, {})(withTheme()(App));
