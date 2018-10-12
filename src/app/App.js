import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from 'components/Header';

import './styles.scss';


class App extends Component {
	render() {
		return (
			<div>
				<Router>
					<Header/>
				</Router>
				App Component from 'app' folder.
			</div>
		);
	}
};


export default App;
