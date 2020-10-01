import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const middlewares = [thunk];

var store = null;

if (process.env.NODE_ENV === 'development') {
    const { logger } = require(`redux-logger`);
    
    middlewares.push(logger);

    const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    store = composeEnhancers(applyMiddleware(...middlewares))(createStore)(reducer);
} else {
    store = compose(applyMiddleware(...middlewares))(createStore)(reducer);
}

export default store;