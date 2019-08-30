import {USER_LOGOUT} from './user';

export const SELECTED = '@project/SELECT';

const initialState = null;

/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECTED:
      const {project} = action.payload;
      return project;
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}

/* Actions */

export const selectProject = (project) => async (dispatch) => {
  dispatch(selectProjectAct(project));
};


/* Action creators */

export const selectProjectAct = (project) => ({
  type: SELECTED,
  payload: {
    project
  }
});