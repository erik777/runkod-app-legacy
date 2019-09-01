import to from 'await-to-js';

import {File} from '../model';

import {USER_LOGOUT} from './user';
import {SELECTED} from './project';

const initialState = {
  loading: false,
  list: []
};


/* Action types */

export const START_FETCH = '@files/START_FETCH';
export const FETCHED = '@files/FETCHED';

/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case START_FETCH:
      return Object.assign({}, state, {loading: true});
    case FETCHED:
      const {files} = action.payload;
      return Object.assign({}, state, {loading: false, list: files.map(x => ({...x.attrs}))});
    case SELECTED:
      return initialState;
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}

/* Actions */

export const fetchFiles = () => async (dispatch, getState) => {

  const {project, path} = getState();

  dispatch(fetchFilesAct());

  const [err, files] = await to(File.fetchOwnList({project, path, sort: '-createdAt'}));

  if (err) {
    return
  }

  dispatch(filesFetchedAct(files));
};


/* Action creators */

export const fetchFilesAct = () => ({
  type: START_FETCH
});

export const filesFetchedAct = (files) => ({
  type: FETCHED,
  payload: {
    files
  }
});