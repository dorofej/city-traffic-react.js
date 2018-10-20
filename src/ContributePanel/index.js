import React, { Component, Fragment } from 'react';

import { fb, dbName } from 'config';

import PlaceInput from './PlaceInput';
import { AddButton, CloseButton } from './Buttons';

import './styles.scss';

const l = require('utils/log')(module);


class ContributePanel extends Component {
	constructor(props) {
		l();

		super(props);

		this.handlePlaceInputChange = this.handlePlaceInputChange.bind(this);
		this.closeEndPoint = this.closeEndPoint.bind(this);
		this.addEndPoint = this.addEndPoint.bind(this);

		this.state = {
			endPoints: [],
		};
	}

	componentWillMount() {
		l();

		fb.database()
			.ref(dbName)
			.on('value', (snapshot) => {
				l('componentWillMount - fb.database().on(value)');
				const endPoints = [];

				snapshot.forEach((endPoint) => {
					endPoints.push({
						id: endPoint.key,
						placeValue: endPoint.val(),
					});
				});

				if (endPoints.length < 2) {
					fb.database().ref(dbName).push({ label: '' });
				};
			});
	}

	componentDidMount() {
		l();

		fb.database()
			.ref(dbName)
			.on('value', (snapshot) => {
				l('componentDidMount - fb.database().on(value)');
				const endPoints = [];

				snapshot.forEach((endPoint) => {
					endPoints.push({
						id: endPoint.key,
						placeValue: endPoint.val(),
					});
				});

				if (endPoints.length > 2) {
					endPoints.push(endPoints.splice(1, 1)[0]);
				};

				this.setState({ endPoints });
			});
	}

	addEndPoint() {
		l();

		fb.database().ref(dbName).push({ label: '' });
	}

	closeEndPoint(event, index) {
		l();

		const { endPoints } = this.state;
		fb.database().ref(dbName).child(endPoints[index].id).remove();
	}

	handlePlaceInputChange(value, index) {
		l();

		const { endPoints } = this.state;

		fb.database().ref(dbName).update({
			[endPoints[index].id]: value,
		});
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
							value={endPoint.placeValue}
							placeholder="Start Point"
							onChange={(value) => { this.handlePlaceInputChange(value, index); }}
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
								value={endPoint.placeValue}
								placeholder="End Point"
								onChange={(value) => { this.handlePlaceInputChange(value, index); }}
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
								value={endPoint.placeValue}
								onChange={(value) => { this.handlePlaceInputChange(value, index); }}
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
