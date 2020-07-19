import {
  SET_PASSWORD,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_ERROR,
  CLEAR_SET_PASSWORD_MESSAGE
} from "./constants";

export const setPassword = payload => {
  return { type: SET_PASSWORD, payload };
};
export const setPasswordSuccess = payload => {
  return { type: SET_PASSWORD_SUCCESS, payload };
};
export const setPasswordError = error => {
  return { type: SET_PASSWORD_ERROR, error };
};

export const clearSetPasswordMessage = () => {
  return { type: CLEAR_SET_PASSWORD_MESSAGE };
};
