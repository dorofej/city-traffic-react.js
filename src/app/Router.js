import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from 'Dashboard';

const l = require('utils/log')(module);


class Router extends Component {
	render() {
		l();

		return (
			<Switch>
				<Route
					exact
					key="dashboard"
					path="/dashboard"
					component={() => (<Dashboard/>)}
				/>
			</Switch>
		);
	}
};


export default Router;
