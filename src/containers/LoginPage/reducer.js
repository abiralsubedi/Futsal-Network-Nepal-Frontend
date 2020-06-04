import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS
} from "./constants";

export const initialState = {
  isLoading: false,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token"),
  loginError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        loginError: false
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: action.payload.token
      };

    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        loginError: action.error
      };

    case LOGOUT:
      return { ...state, isLoading: true, isAuthenticated: true };

    case LOGOUT_SUCCESS:
      return { ...state, isLoading: false, isAuthenticated: false, token: "" };
    default:
      return state;
  }
};