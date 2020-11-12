import {
  POST_DESCRIPTION,
  POST_DESCRIPTION_ERROR,
  POST_DESCRIPTION_SUCCESS,
  CLEAR_DESCRIPTION_DATA
} from "./constants";

export const postDescriptionInfo = payload => ({
  type: POST_DESCRIPTION,
  payload
});

export const postDescriptionInfoSuccess = payload => ({
  type: POST_DESCRIPTION_SUCCESS,
  payload
});
export const postDescriptionInfoError = error => ({
  type: POST_DESCRIPTION_ERROR,
  error
});

export const clearDescriptionData = () => ({
  type: CLEAR_DESCRIPTION_DATA
});
