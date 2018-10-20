import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

import SearchSuggestions from './SearchSuggestions';

const l = require('utils/log')(module);


const provider = new OpenStreetMapProvider();

class PlaceInput extends Component {
	constructor(props) {
		l();
		super(props);

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSuggestionClick = this.handleSuggestionClick.bind(this);

		this.state = {
			suggestions: [],
			isActive: false,
		};
	}

	handleInputChange({ target }) {
		l();

		const { value } = target;
		const { onChange } = this.props;
		onChange({ label: value });

		provider
			.search({ query: value })
			.then((result) => {
				const suggestions = result.map(({ label }) => (label));
				this.setState({ suggestions });
			})
			.catch((error) => {
				l('LEAFLET SEARCH - ERROR: ', error);
			});
	}

	handleSuggestionClick(value) {
		l();

		const { onChange } = this.props;

		provider
			.search({ query: value })
			.then((result) => {
				if (result[0]) {
					onChange(result[0]);
				} else {
					onChange({ label: '' });
				};
			})
			.catch((error) => {
				l('LEAFLET SEARCH - ERROR: ', error);
			});
	}

	render() {
		l();

		const {
			placeholder,
			value,
			style = {},
		} = this.props;

		const { isActive, suggestions } = this.state;

		return (
			<div className="contribute__suggestions-wrapper">
				<div
					className="contribute__input-wrapper"
					style={style}
				>
					<div className="contribute__input-left-padding"/>
					<input
						className="contribute__input"
						value={value.label}
						onChange={this.handleInputChange}
						type="text"
						placeholder={placeholder}
						onFocus={() => this.setState({ isActive: true })}
						onBlurCapture={() => setTimeout(() => this.setState({ isActive: false }), 100)}
					/>
					<span
						className="contribute__input-clear-wrapper"
						onClick={() => {
							/* Clear Place Input using fakeEvent */
							this.handleInputChange({ target: { value: '' } });
						}}
					>
						<img
							className="contribute__input-clear"
							src={require('images/close.svg')}
							alt=""
						/>
					</span>
				</div>
				<SearchSuggestions
					suggestions={isActive ? suggestions : []}
					onClick={this.handleSuggestionClick}
				/>
			</div>
		);
	}
};

PlaceInput.propTypes = {
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.object,
	style: PropTypes.object,
};


export default PlaceInput;
