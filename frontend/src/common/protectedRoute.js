import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AUTH_STORAGE_KEY } from './constants';

export default ({ component:Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY);

    return (<Route {...rest}>
                {isAuthenticated ? <Component />:<Redirect to="/" />}
            </Route>);
}