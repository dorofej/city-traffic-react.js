import React, { Component, Fragment } from 'react';

import PlaceInput from './PlaceInput';
import { AddButton, CloseButton } from './Buttons';

import './styles.scss';

const l = require('utils/log')(module);

const fakeEndPoints = [
	'Start Point 1',
	'Start Point 2',
	'Start Point 3',
	'Start Point 4',
	'End Point',
];

class ContributePanel extends Component {
	constructor(props) {
		l();

		super(props);

		this.handleInputChange = this.handleInputChange.bind(this);
		this.closeEndPoint = this.closeEndPoint.bind(this);
		this.addEndPoint = this.addEndPoint.bind(this);

		this.state = {
			endPoints: [...fakeEndPoints],
		};
	}

	addEndPoint() {
		l();

		const { endPoints } = this.state;
		endPoints.splice(endPoints.length - 1, 0, '');
		this.setState({ endPoints: [...endPoints] });
	}

	closeEndPoint(event, index) {
		l();

		const { endPoints } = this.state;
		endPoints.splice(index, 1);
		this.setState({ endPoints: [...endPoints] });
	}

	handleInputChange({ target }, index) {
		l();

		const { endPoints } = this.state;
		endPoints[index] = target.value;
		this.setState({ endPoints: [...endPoints] });
	}

	renderPlacesInputs() {
		l();

		const { endPoints } = this.state;

		return endPoints.map((endPoint, index) => {
			switch(index) {
				// Start Point
				case 0:
					return (
						<PlaceInput
							key={index}
							value={endPoint}
							placeholder="Start Point"
							onChange={(event) => { this.handleInputChange(event, index); }}
						/>
					);
				// Intermediate Point
				case (endPoints.length - 1):
					return (
						<Fragment key={index}>
							<AddButton
								onClick={this.addEndPoint}
							/>
							<PlaceInput
								value={endPoint}
								placeholder="End Point"
								onChange={(event) => { this.handleInputChange(event, index); }}
							/>
						</Fragment>
					);
				// Final Point
				default:
					return (
						<div
							className="contribute__intermediate-point"
							key={index}
						>
							<PlaceInput
								value={endPoint}
								onChange={(event) => { this.handleInputChange(event, index); }}
								style={{ marginRight: 20 }}
							/>
							<CloseButton
								onClick={(event) => { this.closeEndPoint(event, index); }}
							/>
						</div>
					);
			};
		});
	}

	render() {
		l();

		return (
			<div
				className="contribute"
			>
				{this.renderPlacesInputs()}
			</div>
		);
	}
};


export default ContributePanel;
