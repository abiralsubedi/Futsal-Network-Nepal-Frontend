import {
  GET_DESCRIPTION_INFO,
  GET_DESCRIPTION_INFO_ERROR,
  GET_DESCRIPTION_INFO_SUCCESS,
  POST_DESCRIPTION,
  POST_DESCRIPTION_ERROR,
  POST_DESCRIPTION_SUCCESS,
  CLEAR_DESCRIPTION_DATA
} from "./constants";

export const getDescriptionInfo = payload => ({
  type: GET_DESCRIPTION_INFO,
  payload
});

export const getDescriptionInfoSuccess = payload => ({
  type: GET_DESCRIPTION_INFO_SUCCESS,
  payload
});
export const getDescriptionInfoError = error => ({
  type: GET_DESCRIPTION_INFO_ERROR,
  error
});

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
