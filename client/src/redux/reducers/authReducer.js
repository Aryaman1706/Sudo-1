import { LOGIN_USER, LOGIN_ERROR, LOGOUT_USER } from "../types";

const defaultState = {
  user: null,
  authError: null,
  isAuthenticated: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        authError: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        authError: action.payload,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_USER:
      return {
        ...state,
        authError: null,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};
