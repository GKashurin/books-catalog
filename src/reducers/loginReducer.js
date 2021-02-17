import {FETCH_USERS_SUCCESS, LOG_IN, LOG_OUT} from "../actions/actions";

const initialState = {
	isLoggedIn: false,
	mail: '',
	password: '',
	user: undefined
};

export const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOG_IN: {
			return {
				...state,
				isLoggedIn: true,
				user: action.payload
			}
		}
		case FETCH_USERS_SUCCESS: {
			return {
				isLoggedIn: true
			}
		}
		case LOG_OUT: {
			return {
				isLoggedIn: false
			}
		}
		default:
			return state;
	}
}
