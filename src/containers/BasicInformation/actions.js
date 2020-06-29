import {
  POST_PROFILE_INFO,
  POST_PROFILE_INFO_ERROR,
  POST_PROFILE_INFO_SUCCESS,
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

export const clearMessage = () => ({ type: CLEAR_MESSAGE });
