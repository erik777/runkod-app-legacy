import {USER_LOGOUT} from './user';
import {SELECT as PROJECT_SELECT} from './project';
import {BASE_PATH} from '../constants';

export const SELECT = '@path/SELECT';

const initialState = BASE_PATH;

/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT:
      return action.payload.path;
    case PROJECT_SELECT:
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}

/* Actions */
export const selectPath = (path) => async (dispatch) => {
  dispatch(selectAct(path));
};


/* Action creators */
export const selectAct = (path) => ({
  type: SELECT,
  payload: {
    path
  }
});