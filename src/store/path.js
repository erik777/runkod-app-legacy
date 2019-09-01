import {USER_LOGOUT} from './user';
import {SELECTED} from './project';

const initialState = '/';

/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECTED:
      return initialState;
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}

/* Actions */


/* Action creators */

