import { REHYDRATE } from 'redux-persist/lib/constants';

const initState = {
	alerts: [],
};


export const appReducer = (state = initState, action) => {
	switch(action.type) {
		case REHYDRATE:
			return { ...state, ...{ alerts: [] } };
		default:
			return state;
	};
};
