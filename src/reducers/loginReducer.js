import {FETCH_USERS_SUCCESS, LOG_OUT} from "../actions/actions";

const initialState = {
	isLoggedIn: false,
	mail: '',
	password: ''
};

export const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USERS_SUCCESS: {
			return {isLoggedIn: true}
		}
		case LOG_OUT: {
			return {isLoggedIn: false}
		}
		default:
			return state;
	}
}
