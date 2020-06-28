import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  GET_PROFILE_INFO,
  GET_PROFILE_INFO_SUCCESS,
  GET_PROFILE_INFO_ERROR,
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

export const getProfileInfo = () => {
  return { type: GET_PROFILE_INFO };
};

export const getProfileInfoSuccess = payload => {
  return { type: GET_PROFILE_INFO_SUCCESS, payload };
};

export const getProfileInfoError = error => {
  return { type: GET_PROFILE_INFO_ERROR, error };
};

export const clearLoginMessage = () => ({ type: CLEAR_LOGIN_MESSAGE });
