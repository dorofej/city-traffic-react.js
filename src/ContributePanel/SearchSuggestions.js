import React from 'react';
import PropTypes from 'prop-types';


const SearchSuggestions = ({ suggestions, onClick }) => (
	<div className="search-suggestions__results">
		{
			suggestions.map((suggestion) => (
				<div className="search-suggestions__result-wrapper">
					<div
						className="search-suggestions__result"
						onClick={() => onClick(suggestion)}
					>
						{suggestion}
					</div>
				</div>
			))
		}
	</div>
);

SearchSuggestions.propTypes = {
	suggestions: PropTypes.array.isRequired,
	onClick: PropTypes.func.isRequired,
};


export default SearchSuggestions;
