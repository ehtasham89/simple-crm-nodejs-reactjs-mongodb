import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

export default function MyProvider({ children }) {
    return <Provider store={store}>
        {children}
    </Provider>
}