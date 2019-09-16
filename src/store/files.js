import to from 'await-to-js';

import {File} from '../model';

import fs from '../fs';

import {USER_LOGOUT} from './user';
import {SELECT as PROJECT_SELECT} from './project';

const initialState = {
  loading: false,
  list: [],
  map: null
};


/* Action types */
export const FETCH = '@files/FETCH';
export const FETCH_ERROR = '@files/FETCH_ERROR';
export const FETCHED = '@files/FETCHED';

/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH:
      return Object.assign({}, state, {loading: true, list: [], map: null});
    case FETCHED:
      const {files} = action.payload;
      const list = files.map(x => ({...x.attrs}));
      const map = fs.buildPathMap(list);
      return Object.assign({}, state, {loading: false, list, map});
    case FETCH_ERROR:
    case PROJECT_SELECT:
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}

/* Actions */
export const fetchFiles = () => async (dispatch, getState) => {
  const {project, files} = getState();

  if (files.loading) {
    return;
  }

  dispatch(fetchAct());

  const filter = {project: project._id, tag: project.tag, deleted: false, sort: 'createdAt'};
  const [err, resp] = await to(File.fetchOwnList(filter));

  if (err) {
    dispatch(fetchErrorAct());
    return;
  }

  dispatch(fetchedAct(resp));
};


/* Action creators */
export const fetchAct = () => ({
  type: FETCH
});

export const fetchedAct = (files) => ({
  type: FETCHED,
  payload: {
    files
  }
});

export const fetchErrorAct = () => ({
  type: FETCH_ERROR
});
