import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'typeface-roboto';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import {configureStore} from 'redux-starter-kit'

import { Provider } from 'react-redux';
import { rootReducer } from './Redux/rootReducer';
import { boardReducer } from './Redux/boardReducer';

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

export const store = configureStore({ reducer: {app : rootReducer.reducer,board: boardReducer.reducer}})
ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<App />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root')
);
serviceWorker.unregister();
