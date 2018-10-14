import React from 'react';
import PropTypes from 'prop-types';

const l = require('utils/log')(module);


export const AddButton = ({ onClick }) => {
	l();

	return (
		<div
			className="button--add"
			onClick={onClick}
		>
			+
		</div>
	);
};

AddButton.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export const CloseButton = ({ onClick }) => {
	l();

	return (
		<div
			className="button--close"
			onClick={onClick}
		>
			<span
				role="img"
				aria-label="Close"
			>
				&#x274C;
			</span>
		</div>
	);
};

CloseButton.propTypes = {
	onClick: PropTypes.func.isRequired,
};
