import { combineReducers } from 'redux';

import auth from './../../Auth/reducer';
import user from './../../User/reducer';
import authService from './../services/auth';

const appReducer = combineReducers({
    auth,
    user
})
  
const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
      state = undefined;

      authService.removeToken();
    }
  
    return appReducer(state, action)
}

export default rootReducer;
