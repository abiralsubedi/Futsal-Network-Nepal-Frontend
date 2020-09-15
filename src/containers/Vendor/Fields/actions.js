import {
  GET_FIELD_INFO,
  GET_FIELD_INFO_ERROR,
  GET_FIELD_INFO_SUCCESS,
  POST_FIELD_INFO,
  POST_FIELD_INFO_ERROR,
  POST_FIELD_INFO_SUCCESS,
  CLEAR_FIELD_DATA
} from "./constants";

export const getFieldInfo = payload => ({
  type: GET_FIELD_INFO,
  payload
});

export const getFieldInfoSuccess = payload => ({
  type: GET_FIELD_INFO_SUCCESS,
  payload
});
export const getFieldInfoError = error => ({
  type: GET_FIELD_INFO_ERROR,
  error
});

export const postFieldInfo = payload => ({
  type: POST_FIELD_INFO,
  payload
});

export const postFieldInfoSuccess = payload => ({
  type: POST_FIELD_INFO_SUCCESS,
  payload
});
export const postFieldInfoError = error => ({
  type: POST_FIELD_INFO_ERROR,
  error
});

export const clearFieldData = () => ({
  type: CLEAR_FIELD_DATA
});
