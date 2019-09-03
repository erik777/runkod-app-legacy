import {USER_LOGOUT} from './user';
import {SELECTED as PROJECT_SELECTED} from './project';

export const SELECTED = '@path/SELECTED';

const initialState = '/';

/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECTED:
      return action.payload.path;
    case PROJECT_SELECTED:
      return initialState;
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}

/* Actions */

export const selectPath = (path) => async (dispatch) => {
  dispatch(selectPathAct(path));
};


/* Action creators */

export const selectPathAct = (path) => ({
  type: SELECTED,
  payload: {
    path
  }
});