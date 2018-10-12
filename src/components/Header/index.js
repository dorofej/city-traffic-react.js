import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const l = require('utils/log')(module);


class Header extends Component {
	render() {
		l();

		return (
			<div
				className="header"
			>
				<div className="header__navigation">
					<Link
						to="dashboard"
						className="header__link"
					>
						DASHBOARD
					</Link>
					<Link
						to="contributing"
						className="header__link"
					>
						CONTRIBUTING
					</Link>
				</div>
				<div
					className="header__login-section"
				>
					<img
						className="header__user-icon"
						src={require('../../images/man-user.svg')}
						alt=""
					/>
				</div>
			</div>
		);
	}
};


export default Header;
