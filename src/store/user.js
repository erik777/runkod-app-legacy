export const USER_LOGIN = '@user/LOGIN';
export const USER_LOGOUT = '@user/USER_LOGOUT';

const initialState = null;

/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return action.payload;
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}

/* Actions */
export const login = (username, image) => {
  return async (dispatch) => {
    dispatch(loginAct(username, image));
  }
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(logOutAct());
  }
};


/* Action creators */
export const loginAct = (username, image) => ({
  type: USER_LOGIN,
  payload: {username, image}
});


export const logOutAct = () => ({
  type: USER_LOGOUT
});