import {
  SET_PASSWORD,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_ERROR,
  UPDATE_EMAIL,
  UNLINK_EMAIL,
  CLEAR_SET_PASSWORD_MESSAGE
} from "./constants";

export const setPassword = payload => {
  return { type: SET_PASSWORD, payload };
};
export const setPasswordSuccess = message => {
  return { type: SET_PASSWORD_SUCCESS, message };
};
export const setPasswordError = error => {
  return { type: SET_PASSWORD_ERROR, error };
};

export const updateEmail = payload => {
  return { type: UPDATE_EMAIL, payload };
};

export const unlinkEmail = payload => {
  return { type: UNLINK_EMAIL, payload };
};

export const clearSetPasswordMessage = () => {
  return { type: CLEAR_SET_PASSWORD_MESSAGE };
};
