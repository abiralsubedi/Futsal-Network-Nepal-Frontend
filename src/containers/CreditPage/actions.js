import {
  GET_CREDIT_HISTORY,
  GET_CREDIT_HISTORY_ERROR,
  GET_CREDIT_HISTORY_SUCCESS,
  CLEAR_CREDIT_HISTORY
} from "./constants";

export const getCreditHistory = payload => ({
  type: GET_CREDIT_HISTORY,
  payload
});

export const getCreditHistorySuccess = payload => ({
  type: GET_CREDIT_HISTORY_SUCCESS,
  payload
});
export const getCreditHistoryError = error => ({
  type: GET_CREDIT_HISTORY_ERROR,
  error
});

export const clearCreditHistory = () => ({
  type: CLEAR_CREDIT_HISTORY
});
