import {
  POST_PROFILE_PICTURE,
  POST_PROFILE_PICTURE_ERROR,
  POST_PROFILE_PICTURE_SUCCESS,
  CLEAR_MESSAGE
} from "./constants";

export const postProfilePicture = payload => {
  return { type: POST_PROFILE_PICTURE, payload };
};
export const postProfilePictureSuccess = message => {
  return { type: POST_PROFILE_PICTURE_SUCCESS, message };
};
export const postProfilePictureError = error => {
  return { type: POST_PROFILE_PICTURE_ERROR, error };
};

export const clearMessage = () => ({ type: CLEAR_MESSAGE });
