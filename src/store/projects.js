import to from 'await-to-js';

import {USER_LOGOUT} from './user';

import {Project} from '../model';


const initialState = {
  loading: false,
  list: []
};

/* Action types */

export const START_FETCH = '@projects/START_FETCH';
export const FETCHED = '@projects/FETCHED';


/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case START_FETCH:
      return Object.assign({}, state, {loading: true});
    case FETCHED:
      const {projects} = action.payload;
      return {loading: false, list: projects.map(x => ({...x.attrs}))};
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}


/* Actions */
export const fetchProjects = () => async (dispatch) => {

  dispatch(fetchProjectsAct());

  const [err, projects] = await to(Project.fetchOwnList({sort: '-createdAt'}));

  if (err) {
    return
  }

  dispatch(projectsFetchedAct(projects));
};


/* Action creators */

export const fetchProjectsAct = () => ({
  type: START_FETCH
});

export const projectsFetchedAct = (projects) => ({
  type: FETCHED,
  payload: {
    projects
  }
});