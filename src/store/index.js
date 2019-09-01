import {createStore, applyMiddleware, compose} from 'redux'
import {combineReducers} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk'

import user from './user';
import projects from './projects';
import project from './project';
import path from './path';
import files from './files';

const createHistory = require('history').createBrowserHistory;

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const combinedReducers = combineReducers({
  router: connectRouter(history),
  user,
  projects,
  project,
  path,
  files
});

export default createStore(
  combinedReducers,
  initialState,
  composedEnhancers
);