import React from 'reactn';
import { connect } from 'react-redux';
import { setOpenings, addOpening, setSubOpenings } from './Redux/actions';
import './App.css';
import Xadrez from './Chess';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import FirebaseService from './Firebase/firebaseService';

import NavBar from './AppBar';

let wait = ms => new Promise(resolve => setTimeout(resolve, ms));

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	async componentDidMount() {
		const openings = await FirebaseService.getOpenings();
		await wait(500)
		this.props.setOpenings(openings);
	}
	render() {
		return (
			<div className="App container-fluid" style={{ height: '100vh', backgroundColor: grey[700] }}>
				<CssBaseline />
				<div className="row">
					<NavBar />
				</div>
				<Xadrez />
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return state;
};
export default connect(mapStateToProps, { setOpenings, setSubOpenings, addOpening })(withTheme()(App));
