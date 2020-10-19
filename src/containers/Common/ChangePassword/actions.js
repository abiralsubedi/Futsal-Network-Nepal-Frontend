import {
  POST_PASSWORD,
  POST_PASSWORD_ERROR,
  POST_PASSWORD_SUCCESS,
  UNLINK_EMAIL,
  CLEAR_MESSAGE
} from "./constants";

export const postPassword = payload => {
  return { type: POST_PASSWORD, payload };
};
export const postPasswordSuccess = message => {
  return { type: POST_PASSWORD_SUCCESS, message };
};
export const postPasswordError = error => {
  return { type: POST_PASSWORD_ERROR, error };
};

export const unLinkEmail = () => {
  return { type: UNLINK_EMAIL };
};

export const clearMessage = () => ({ type: CLEAR_MESSAGE });
