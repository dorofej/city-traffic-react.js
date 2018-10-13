import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from 'components/Header';
import Dashboard from 'Dashboard';

import './styles.scss';

const l = require('utils/log')(module);


class App extends Component {
	render() {
		l();

		return (
			<div>
				<Router>
					<Header/>
				</Router>
				<Dashboard/>
			</div>
		);
	}
};


export default App;
