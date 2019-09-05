import {createStore, applyMiddleware, compose} from 'redux'
import {combineReducers} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk'

import user from './user';
import ui from './ui';
import projects from './projects';
import project from './project';
import path from './path';
import files from './files';
import uploadQueue from './upload-queue';
import checkList from './check-list';

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
  ui,
  projects,
  project,
  path,
  files,
  uploadQueue,
  checkList
});

export default createStore(
  combinedReducers,
  initialState,
  composedEnhancers
);