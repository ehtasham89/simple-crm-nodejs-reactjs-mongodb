import {
    AUTH_BOOT_START,
    AUTH_BOOT_COMPLETE,
    AUTH_REQUEST_SEND,
    AUTH_REQUEST_SUCCESS,
    AUTH_REQUEST_FAIL
} from './actions';

const initialState = {
    bootcomplete: false,
    requesting: false,
    token: null,
    error: null,
    user: {}
};

export default (previousState = initialState, action) => {
    switch (action.type) {
        case AUTH_BOOT_START: return { ...previousState, bootcomplete: false };
        case AUTH_BOOT_COMPLETE: return { ...previousState, ...action.payload};
        case AUTH_REQUEST_SEND: return { ...previousState, requesting: true };
        case AUTH_REQUEST_SUCCESS: return { ...previousState, requesting: false, ...action.payload };
        case AUTH_REQUEST_FAIL: return { ...previousState, requesting: false, bootcomplete: true, error: action.payload };
        default: return previousState;
    }
};