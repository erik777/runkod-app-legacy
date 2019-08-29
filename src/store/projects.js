import to from 'await-to-js';

import {USER_LOGOUT} from './user';

import {Project} from '../model';


const initialState = {
  loading: false,
  list: [],
  selected: null
};

/* Action types */

export const START_FETCH = '@projects/START_FETCH';
export const FETCHED = '@projects/FETCHED';
export const SELECTED = '@projects/SELECT';


/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case START_FETCH:
      return Object.assign({}, state, {loading: true});
    case FETCHED:
      const {projects} = action.payload;
      return Object.assign({}, state, {loading: false, list: projects.map(x => ({...x.attrs}))});
    case SELECTED:
      const {project} = action.payload;
      return Object.assign({}, state, {selected: project});
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

export const selectProject = (project) => async (dispatch) => {
  dispatch(selectProjectAct(project));
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

export const selectProjectAct = (project) => ({
  type: SELECTED,
  payload: {
    project
  }
});