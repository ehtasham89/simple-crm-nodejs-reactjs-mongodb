import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AUTH_STORAGE_KEY } from './constants';

export default ({ children: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY);

    return <Route {...rest} 
                render={(props) => (
                    isAuthenticated === true ?
                    <Component {...props} /> :
                    <Redirect to='/' />
            )}/>
}