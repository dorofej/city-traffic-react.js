import { REHYDRATE } from 'redux-persist/lib/constants';

const l = require('utils/log')(module);

const initState = {
	alerts: [],
};


export const appReducer = (state = initState, action) => {
	l();

	switch(action.type) {
		case REHYDRATE:
			return { ...state, ...{ alerts: [] } };
		default:
			return state;
	};
};
