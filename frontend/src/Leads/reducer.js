import {
    LEADS_LIST,
    LEADS_CURRENT
} from './actions';

const initialState = {
    current:{},
    list: []
};

export default (previousState = initialState, action) => {
    switch (action.type) {
        case LEADS_LIST: return { ...previousState, ...action.payload};
        case LEADS_CURRENT: return { ...previousState, ...action.payload};

        default: return previousState;
    }
};