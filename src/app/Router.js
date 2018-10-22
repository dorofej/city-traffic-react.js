import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from 'Dashboard';
import ContributePanel from 'ContributePanel';

const l = require('utils/log')(module);


class Router extends Component {
	render() {
		l();

		return (
			<Switch>
				<Route
					exact
					key="root"
					path="/"
					component={() => (<Redirect to="/dashboard"/>)}
				/>
				<Route
					exact
					key="dashboard"
					path="/dashboard"
					component={() => (<Dashboard/>)}
				/>
				<Route
					exact
					key="contributing"
					path="/contributing"
					component={() => (<ContributePanel/>)}
				/>
			</Switch>
		);
	}
};


export default Router;
