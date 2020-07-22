import {
  POST_PROFILE_INFO,
  POST_PROFILE_INFO_ERROR,
  POST_PROFILE_INFO_SUCCESS,
  POST_CHANGE_EMAIL,
  POST_CHANGE_EMAIL_ERROR,
  POST_CHANGE_EMAIL_SUCCESS,
  CLEAR_MESSAGE
} from "./constants";

export const postProfileInfo = payload => {
  return { type: POST_PROFILE_INFO, payload };
};
export const postProfileInfoSuccess = message => {
  return { type: POST_PROFILE_INFO_SUCCESS, message };
};
export const postProfileInfoError = error => {
  return { type: POST_PROFILE_INFO_ERROR, error };
};

export const postChangeEmail = payload => {
  return { type: POST_CHANGE_EMAIL, payload };
};
export const postChangeEmailSuccess = message => {
  return { type: POST_CHANGE_EMAIL_SUCCESS, message };
};
export const postChangeEmailError = error => {
  return { type: POST_CHANGE_EMAIL_ERROR, error };
};

export const clearMessage = () => ({ type: CLEAR_MESSAGE });
