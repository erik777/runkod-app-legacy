import {USER_LOGOUT} from './user';

export const TOGGLE_NEW_PROJECT = '@ui/TOGGLE_NEW_PROJECT';
export const TOGGLE_SIDE_PROJECTS_VISIBLE = '@ui/TOGGLE_SIDE_PROJECTS_VISIBLE';
export const TOGGLE_DELETE_DETAIL = '@ui/TOGGLE_DELETE_DETAIL';
export const TOGGLE_DELETE_SUMMARY_DETAIL = '@ui/TOGGLE_DELETE_SUMMARY_DETAIL';

const initialState = {
  newProject: false,
  sideProjectsVisible: true,
  deleteDetail: false,
  deleteSummaryDetail: false
};

/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return initialState;
    case TOGGLE_NEW_PROJECT:
      return Object.assign({}, state, {newProject: action.payload.what});
    case TOGGLE_SIDE_PROJECTS_VISIBLE:
      return Object.assign({}, state, {sideProjectsVisible: action.payload.what});
    case TOGGLE_DELETE_DETAIL:
      return Object.assign({}, state, {deleteDetail: action.payload.what});
    case TOGGLE_DELETE_SUMMARY_DETAIL:
      return Object.assign({}, state, {deleteSummaryDetail: action.payload.what});
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
      case 'sideProjectsVisible':
        act = TOGGLE_SIDE_PROJECTS_VISIBLE;
        break;
      case 'deleteDetail':
        act = TOGGLE_DELETE_DETAIL;
        break;
      case 'deleteSummaryDetail':
        act = TOGGLE_DELETE_SUMMARY_DETAIL;
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
