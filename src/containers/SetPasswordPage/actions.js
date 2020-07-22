import {
  SET_PASSWORD,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_ERROR,
  UPDATE_EMAIL,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_EMAIL_ERROR,
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

export const updateEmail = payload => {
  return { type: UPDATE_EMAIL, payload };
};
export const updateEmailSuccess = payload => {
  return { type: UPDATE_EMAIL_SUCCESS, payload };
};
export const updateEmailError = error => {
  return { type: UPDATE_EMAIL_ERROR, error };
};

export const clearSetPasswordMessage = () => {
  return { type: CLEAR_SET_PASSWORD_MESSAGE };
};
