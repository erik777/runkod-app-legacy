import {USER_LOGOUT} from './user';

export const SELECT = '@file/SELECT';

const initialState = null;

/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT:
      const {file} = action.payload;
      return file;
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}

/* Actions */
export const selectFile = (project) => async (dispatch) => {
  dispatch(selectAct(project));
};


/* Action creators */
export const selectAct = (file) => ({
  type: SELECT,
  payload: {
    file
  }
});

