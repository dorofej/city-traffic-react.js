import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import './styles.scss';

import config from 'config';
import findBrowserDims from 'libs/findBrowserDims';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const l = require('utils/log')(module);

const { topbarHeight } = config;

class Dashboard extends Component {
	constructor(props) {
		l();

		super(props);

		this.updateDimensions = this.updateDimensions.bind(this);

		this.state = {
			width: 10000,
			height: 10000,
			lat: 51.505,
			lng: -0.09,
			zoom: 10,
			loaded: false,
		};
	}

	componentDidMount() {
		l();

		setTimeout(() => { this.setState({ loaded: true }); }, 0);

		this.updateDimensions();
		window.addEventListener('resize', this.updateDimensions);
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

		const { lat, lng, zoom } = this.state;
		const position = [lat, lng];

		return (
			<Map
				center={position}
				zoom={zoom}
			>
				<TileLayer
					attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
				/>
				<Marker position={position}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
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
