import {USER_LOGOUT} from './user';

export const SELECT = '@project/SELECT';

const initialState = null;

/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT:
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
  dispatch(selectAct(project));
};


/* Action creators */
export const selectAct = (project) => ({
  type: SELECT,
  payload: {
    project
  }
});