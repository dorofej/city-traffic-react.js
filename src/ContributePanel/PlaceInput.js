import React from 'react';
import PropTypes from 'prop-types';

const l = require('utils/log')(module);


const PlaceInput = ({
	placeholder,
	value,
	onChange,
	style = {},
}) => {
	l();

	return (
		<div
			className="contribute__input-wrapper"
			style={style}
		>
			<input
				className="contribute__input"
				value={value}
				onChange={onChange}
				type="text"
				placeholder={placeholder}
			/>
			<span
				className="contribute__input-clear-wrapper"
				onClick={() => {
					// Clear Place Input using fakeEvent
					const fakeEvent = { target: { value: '' } };
					onChange(fakeEvent);
				}}
			>
				<img
					className="contribute__input-clear"
					src={require('images/close.svg')}
					alt=""
				/>
			</span>
		</div>
	);
};

PlaceInput.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	style: PropTypes.object,
};


export default PlaceInput;
