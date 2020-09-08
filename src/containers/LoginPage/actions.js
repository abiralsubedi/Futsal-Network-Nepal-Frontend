import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  GET_PROFILE_INFO,
  GET_PROFILE_INFO_SUCCESS,
  GET_PROFILE_INFO_ERROR,
  CLEAR_LOGIN_MESSAGE,
  SET_FILE_UPLOAD_DATA,
  UPDATE_PROFILE_PICTURE,
  POST_FORGOT_PASSWORD,
  POST_FORGOT_PASSWORD_SUCCESS,
  POST_FORGOT_PASSWORD_ERROR,
  UPDATE_CREDIT_AMOUNT,
  TOGGLE_ADD_CREDIT_MODAL,
  GET_CLOCK_DATA,
  GET_CLOCK_DATA_SUCCESS,
  GET_WEEK_DATA,
  GET_WEEK_DATA_SUCCESS
} from "./constants";

export const login = payload => {
  return { type: LOGIN, payload };
};
export const loginSuccess = payload => {
  return { type: LOGIN_SUCCESS, payload };
};
export const loginError = error => {
  return { type: LOGIN_ERROR, error };
};

export const logout = () => {
  return { type: LOGOUT };
};
export const logoutSuccess = payload => {
  return { type: LOGOUT_SUCCESS, payload };
};

export const getProfileInfo = () => {
  return { type: GET_PROFILE_INFO };
};

export const getProfileInfoSuccess = payload => {
  return { type: GET_PROFILE_INFO_SUCCESS, payload };
};

export const getProfileInfoError = error => {
  return { type: GET_PROFILE_INFO_ERROR, error };
};

export const setFileUploadData = payload => {
  return { type: SET_FILE_UPLOAD_DATA, payload };
};

export const updateProfilePicture = url => {
  return { type: UPDATE_PROFILE_PICTURE, url };
};

export const updateCreditAmount = amount => {
  return { type: UPDATE_CREDIT_AMOUNT, amount };
};

export const postForgotPassword = payload => {
  return { type: POST_FORGOT_PASSWORD, payload };
};
export const postForgotPasswordSuccess = message => {
  return { type: POST_FORGOT_PASSWORD_SUCCESS, message };
};
export const postForgotPasswordError = error => {
  return { type: POST_FORGOT_PASSWORD_ERROR, error };
};

export const toggleAddCreditModal = data => {
  return { type: TOGGLE_ADD_CREDIT_MODAL, data };
};

export const clearLoginMessage = () => ({ type: CLEAR_LOGIN_MESSAGE });

export const getClockData = () => ({ type: GET_CLOCK_DATA });
export const getClockDataSuccess = payload => ({
  type: GET_CLOCK_DATA_SUCCESS,
  payload
});

export const getWeekData = () => ({ type: GET_WEEK_DATA });
export const getWeekDataSuccess = payload => ({
  type: GET_WEEK_DATA_SUCCESS,
  payload
});
