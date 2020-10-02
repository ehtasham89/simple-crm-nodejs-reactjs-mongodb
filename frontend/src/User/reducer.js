import {
    USER_LIST,
    USER_CURRENT
} from './actions';

const initialState = {
    current:{},
    list: []
};

export default (previousState = initialState, action) => {
    switch (action.type) {
        case USER_LIST: return { ...previousState, ...action.payload};
        case USER_CURRENT: return { ...previousState, ...action.payload};

        default: return previousState;
    }
};