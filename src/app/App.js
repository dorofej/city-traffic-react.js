import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader';

import Header from 'components/Header';
import history from 'libs/history';

import AppRouter from './Router';


import './styles.scss';

const l = require('utils/log')(module);


class App extends Component {
	render() {
		l();

		return (
			<ConnectedRouter history={history}>
				<div>
					<Header/>
					<AppRouter/>
				</div>
			</ConnectedRouter>
		);
	}
};


export default hot(module)(App);
