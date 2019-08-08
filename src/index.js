import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'typeface-roboto';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import { Provider } from 'react-redux';

import {store} from './Redux/rootReducer';

const theme = createMuiTheme({
	palette: {
		background: {
			paper: grey[800]
		},
		primary: {
			// light: will be calculated from palette.primary.main,
			main: grey[900]
			// dark: will be calculated from palette.primary.main,
			//contrastText: grey[50]
		},
		secondary: {
			main: grey[50]
		}
		// error: will use the default color
	},
	typography: {
		useNextVariants: true
	}
});
ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<App />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root')
);
serviceWorker.unregister();
