import {
  GET_USER_LIST,
  GET_USER_LIST_ERROR,
  GET_USER_LIST_SUCCESS,
  CLEAR_USER_LIST_DATA
} from "./constants";

export const getUserList = payload => ({
  type: GET_USER_LIST,
  payload
});

export const getUserListSuccess = payload => ({
  type: GET_USER_LIST_SUCCESS,
  payload
});
export const getUserListError = error => ({
  type: GET_USER_LIST_ERROR,
  error
});

export const clearUserListData = () => ({
  type: CLEAR_USER_LIST_DATA
});
