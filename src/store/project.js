import {USER_LOGOUT} from './user';

export const SELECT = '@project/SELECT';
export const SET_STATUS = '@project/SET_STATUS';

const initialState = null;

/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT:
      const {project} = action.payload;
      return project;
    case SET_STATUS:
      const {status} = action.payload;
      return Object.assign({}, state, {status});
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

export const setProjectStatus = (status) => async (dispatch) => {
  dispatch(setStatusAct(status));
};


/* Action creators */
export const selectAct = (project) => ({
  type: SELECT,
  payload: {
    project
  }
});

export const setStatusAct = (status) => ({
  type: SET_STATUS,
  payload: {
    status
  }
});