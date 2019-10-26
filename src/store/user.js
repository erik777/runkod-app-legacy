import to from 'await-to-js';

import {User} from 'radiks';

export const USER_LOGIN = '@user/LOGIN';
export const USER_LOGOUT = '@user/USER_LOGOUT';
export const USER_UPDATE = '@user/USER_UPDATE';

const initialState = null;

/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return action.payload;
    case USER_UPDATE:
      return Object.assign(state, action.payload);
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}

/* Actions */
export const login = (username, image) => {
  return async (dispatch) => {
    // use a fake date until user date load
    const createdAt = (Date.now() - 120000);

    dispatch(loginAct({username, image, createdAt}));

    const [err, resp] = await to(User.fetchList({username: username}));

    if (!err) {
      const {createdAt} = resp[0].attrs;
      dispatch(updateAct({createdAt}));
    }
  }
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(logOutAct());
  }
};


/* Action creators */
export const loginAct = (data) => ({
  type: USER_LOGIN,
  payload: data
});


export const logOutAct = () => ({
  type: USER_LOGOUT
});

export const updateAct = (data) => ({
  type: USER_UPDATE,
  payload: data
});