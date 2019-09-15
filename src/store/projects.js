import to from 'await-to-js';

import {USER_LOGOUT} from './user';

import {Project} from '../model';

const initialState = {
  loading: false,
  list: [],
  selected: null
};

/* Action types */
export const FETCH = '@projects/FETCH';
export const FETCH_ERROR = '@projects/FETCH_ERROR';
export const FETCHED = '@projects/FETCHED';

/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH:
      return Object.assign({}, state, {loading: true});
    case FETCHED:
      const {projects} = action.payload;
      return Object.assign({}, state, {loading: false, list: projects.map(x => ({...x.attrs}))});
    case FETCH_ERROR:
      return initialState;
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}


/* Actions */
export const fetchProjects = () => async (dispatch) => {
  dispatch(fetchAct());

  const [err, projects] = await to(Project.fetchOwnList({sort: '-createdAt'}));

  if (err) {
    dispatch(fetchErrorAct());
    return
  }

  dispatch(fetchedAct(projects));
};


/* Action creators */
export const fetchAct = () => ({
  type: FETCH
});

export const fetchedAct = (projects) => ({
  type: FETCHED,
  payload: {
    projects
  }
});

export const fetchErrorAct = () => ({
  type: FETCH_ERROR
});
