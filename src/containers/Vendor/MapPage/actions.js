import {
  GET_GLOBAL_SEARCH,
  GET_GLOBAL_SEARCH_ERROR,
  GET_GLOBAL_SEARCH_SUCCESS,
  CLEAR_GLOBAL_SEARCH
} from "./constants";

export const getGlobalSearch = payload => ({
  type: GET_GLOBAL_SEARCH,
  payload
});

export const getGlobalSearchSuccess = payload => ({
  type: GET_GLOBAL_SEARCH_SUCCESS,
  payload
});
export const getGlobalSearchError = error => ({
  type: GET_GLOBAL_SEARCH_ERROR,
  error
});

export const clearGlobalSearch = () => ({
  type: CLEAR_GLOBAL_SEARCH
});
