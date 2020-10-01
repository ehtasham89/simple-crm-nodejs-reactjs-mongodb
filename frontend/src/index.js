import React from 'react';
import ReactDOM from 'react-dom';
import StoreProvider from './lib/redux/provider';
import Routes from './common/routes';
import * as serviceWorker from './serviceWorker';
import './App.scss';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <Routes />
    </StoreProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
