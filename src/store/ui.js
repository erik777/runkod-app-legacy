import {USER_LOGOUT} from './user';

export const TOGGLE_NEW_PROJECT = '@ui/TOGGLE_NEW_PROJECT';

const initialState = {
  newProject: false
};

/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return initialState;
    case TOGGLE_NEW_PROJECT:
      return Object.assign({}, state, {newProject: action.payload.what});
    default:
      return state;
  }
}

/* Actions */

export const toggleUiProp = (what) => {
  return async (dispatch, getState) => {
    const {ui} = getState();

    let act;

    switch (what) {
      case 'newProject':
        act = TOGGLE_NEW_PROJECT;
        break;
      default:
        act = '';
        break;
    }

    dispatch({
      type: act,
      payload: {what: !ui[what]}
    });
  }
};
