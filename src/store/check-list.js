import {USER_LOGOUT} from './user';
import {SELECT as PROJECT_SELECT} from "./project";
import {SELECT as PATH_SELECT} from "./path";
import {FINISH as DELETE_QUEUE_FINISH} from "./delete-queue";
import {SET as UPLOAD_QUEUE_SET} from "./upload-queue"

export const ADD = '@check-list/ADD';
export const REMOVE = '@check-list/REMOVE';
export const RESET = '@check-list/RESET';

const initialState = [];

/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD: {
      const {item} = action.payload;

      const n = item.constructor === Array ? [...state, ...item] : [...state, item];

      return [...new Set(n)]
    }
    case REMOVE: {
      const {item} = action.payload;
      return [...state.filter(x => x !== item)]
    }
    case RESET:
    case DELETE_QUEUE_FINISH:
    case UPLOAD_QUEUE_SET:
    case PATH_SELECT:
    case PROJECT_SELECT:
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}

/* Actions */
export const checkListAdd = (item) => async (dispatch) => {
  dispatch(checkListAddAct(item));
};

export const checkListDelete = (item) => async (dispatch) => {
  dispatch(checkListDeleteAct(item));
};

export const checkListReset = () => async (dispatch) => {
  dispatch(checkListResetAct());
};


/* Action creators */
export const checkListAddAct = (item) => ({
  type: ADD,
  payload: {
    item
  }
});

export const checkListDeleteAct = (item) => ({
  type: REMOVE,
  payload: {
    item
  }
});

export const checkListResetAct = () => ({
  type: RESET
});