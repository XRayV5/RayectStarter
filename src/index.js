import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise'

import Routes from './routes';
import RoutesV4 from './routes_v4';
import reducers from './reducers';

// source
import "../style/style.css"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(...[promise])
  ));

// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
ReactDOM.render(
  <Provider store={store}>
    {/* <Routes /> */}
    <RoutesV4/>
  </Provider>
  , document.querySelector('.container'));
