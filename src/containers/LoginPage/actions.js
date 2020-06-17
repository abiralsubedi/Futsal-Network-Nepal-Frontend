import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  CLEAR_LOGIN_MESSAGE
} from "./constants";

export const login = payload => {
  return { type: LOGIN, payload };
};
export const loginSuccess = payload => {
  return { type: LOGIN_SUCCESS, payload };
};
export const loginError = error => {
  return { type: LOGIN_ERROR, error };
};

export const logout = () => {
  return { type: LOGOUT };
};
export const logoutSuccess = payload => {
  return { type: LOGOUT_SUCCESS, payload };
};

export const clearLoginMessage = () => ({ type: CLEAR_LOGIN_MESSAGE });
