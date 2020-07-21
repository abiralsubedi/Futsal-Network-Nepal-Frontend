import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  GET_PROFILE_INFO,
  GET_PROFILE_INFO_SUCCESS,
  CLEAR_LOGIN_MESSAGE,
  SET_FILE_UPLOAD_DATA,
  GET_PROFILE_INFO_ERROR,
  UPDATE_PROFILE_PICTURE,
  POST_FORGOT_PASSWORD,
  POST_FORGOT_PASSWORD_SUCCESS,
  POST_FORGOT_PASSWORD_ERROR
} from "./constants";

export const initialState = {
  isLoading: false,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token"),
  loginError: "",
  profile: JSON.parse(localStorage.getItem("profile")),
  fileUploadData: false,
  postForgotPasswordLoading: false,
  postForgotPasswordSuccess: "",
  postForgotPasswordError: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        loginError: ""
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: action.payload.token
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        loginError: action.error
      };

    case LOGOUT:
      return { ...state, isLoading: true, isAuthenticated: true };
    case LOGOUT_SUCCESS:
      return { ...state, isLoading: false, isAuthenticated: false, token: "" };

    case GET_PROFILE_INFO:
      return { ...state, isLoading: true };
    case GET_PROFILE_INFO_SUCCESS:
      return { ...state, profile: action.payload, isLoading: false };
    case GET_PROFILE_INFO_ERROR:
      return { ...state, isLoading: false };

    case SET_FILE_UPLOAD_DATA:
      return { ...state, fileUploadData: action.payload };

    case UPDATE_PROFILE_PICTURE:
      return { ...state, profile: { ...state.profile, photoUri: action.url } };

    case POST_FORGOT_PASSWORD:
      return {
        ...state,
        postForgotPasswordLoading: true,
        postForgotPasswordError: "",
        postForgotPasswordSuccess: ""
      };

    case POST_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        postForgotPasswordLoading: false,
        postForgotPasswordSuccess: action.message
      };

    case POST_FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        postForgotPasswordLoading: false,
        postForgotPasswordError: action.error
      };

    case CLEAR_LOGIN_MESSAGE:
      return {
        ...state,
        isLoading: false,
        loginError: "",
        postForgotPasswordSuccess: "",
        postForgotPasswordError: ""
      };

    default:
      return state;
  }
};
