import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import * as d3Array from 'd3-array';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import './styles.scss';

import { topbarHeight, fb, dbName } from 'config';
import findBrowserDims from 'libs/findBrowserDims';
import getGeoBounds from 'libs/geoBounds';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const l = require('utils/log')(module);


class Dashboard extends Component {
	constructor(props) {
		l();

		super(props);

		this.updateDimensions = this.updateDimensions.bind(this);

		this.state = {
			width: 10000,
			height: 10000,
			loaded: false,
			positions: [],
		};
	}

	componentDidMount() {
		l();

		this.updateDimensions();
		window.addEventListener('resize', this.updateDimensions);

		fb.database()
			.ref(dbName)
			.on('value', (snapshot) => {
				l('componentDidMount - fb.database().on(value)');

				const endPoints = [];

				snapshot.forEach((endPoint) => {
					const { x, y, label } = endPoint.val();
					endPoints.push({ id: endPoint.key, x, y, label });
				});

				if (endPoints.length > 2) {
					endPoints.push(endPoints.splice(1, 1)[0]);
				};

				const positions = endPoints
					.filter(({ x, y }) => (x && y))
					.map(({ id, x, y, label }) => ({
						id,
						lng: Number(x),
						lat: Number(y),
						marker: label,
					}));

				l('endPoints: ', endPoints);
				l('positions: ', positions);

				this.setState({ positions, loaded: true });
			});
	}

	componentWillUnmount() {
		l();

		window.removeEventListener('resize', this.updateDimensions);
	}

	updateDimensions() {
		l();

		const { width, height } = findBrowserDims();
		this.setState({ width, height });
	}

	renderMap() {
		l();

		const { positions } = this.state;

		let bounds = [[-90, -180], [90, 180]];
		if (positions.length) {
			bounds = getGeoBounds(
				d3Array.extent(positions, ({ lat }) => (lat)),
				d3Array.extent(positions, ({ lng }) => (lng))
			);
		};

		return (
			<Map bounds={bounds}>
				<TileLayer
					attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
				/>
				{
					positions.map(({ lat, lng, marker }) => (
						<Marker position={{ lat, lng }}>
							<Popup>
								{marker}
							</Popup>
						</Marker>
					))
				}
				<Polyline
					color="lime"
					positions={positions}
				/>
			</Map>
		);
	}

	render() {
		l();

		const { width, height, loaded } = this.state;

		return (
			<div
				style={{
					width: width,
					height: height - topbarHeight,
				}}
			>
				{loaded && this.renderMap()}
			</div>
		);
	}
};


export default Dashboard;
