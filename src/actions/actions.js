// Для авторизации
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export const FETCH_USERS_REQUEST = 'FETCH_USER_REQUEST'
export const FETCH_USERS_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USERS_FAILURE = 'FETCH_USER_FAILURE'

// Для авторизации:
export const fetchUserRequest = (props) => ({type: FETCH_USERS_REQUEST, payload: props});
export const fetchUserSuccess = payload => ({type: FETCH_USERS_SUCCESS, payload});
export const fetchUserFailure = error => ({type: FETCH_USERS_FAILURE, error});


export const logIn = (props) => ({ type: LOG_IN, payload: props});
export const logOut = () => ({ type: LOG_OUT });




