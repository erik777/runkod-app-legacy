import to from 'await-to-js';

import {USER_LOGOUT} from './user';

import {Project} from '../model';

const mapper = (project, projects) => {
  let attrs = {...project.attrs};

  // Check for newly added fields
  const redirectTo = attrs.redirectTo && projects.find(x => x._id === attrs.redirectTo) ? attrs.redirectTo : '';
  attrs = Object.assign({}, attrs, {redirectTo});

  return attrs;
};

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
      return Object.assign({}, state, {loading: false, list: projects.map(x => mapper(x, projects))});
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

  const filter = {deleted: false, sort: '-createdAt'};
  const [err, projects] = await to(Project.fetchOwnList(filter));

  if (err) {
    dispatch(fetchErrorAct());
    return
  }

  dispatch(fetchedAct(projects));

  return projects;
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
