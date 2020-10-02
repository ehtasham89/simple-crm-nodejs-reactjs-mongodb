import {
    AUTH_REQUEST_SEND,
    AUTH_REQUEST_SUCCESS,
    AUTH_REQUEST_FAIL,
    AUTH_USER
} from './actions';

const initialState = {
    requesting: false,
    error: null,
    token: "",
    user: {}
};

export default (previousState = initialState, action) => {
    switch (action.type) {
        case AUTH_USER: return { ...previousState, ...action.payload};
        case AUTH_REQUEST_SEND: return { ...previousState, requesting: true };
        case AUTH_REQUEST_SUCCESS: return { ...previousState, requesting: false, ...action.payload };
        case AUTH_REQUEST_FAIL: return { ...previousState, requesting: false, error: action.payload };
        default: return previousState;
    }
};