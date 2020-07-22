import {
  SET_PASSWORD,
  SET_PASSWORD_ERROR,
  SET_PASSWORD_SUCCESS,
  UPDATE_EMAIL,
  UPDATE_EMAIL_ERROR,
  UPDATE_EMAIL_SUCCESS,
  CLEAR_SET_PASSWORD_MESSAGE
} from "./constants";

export const initialState = {
  setPasswordLoading: false,
  setPasswordSuccess: "",
  setPasswordError: "",
  updateEmailLoading: false,
  updateEmailSuccess: "",
  updateEmailError: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PASSWORD:
      return {
        ...state,
        setPasswordLoading: true,
        setPasswordSuccess: "",
        setPasswordError: ""
      };

    case SET_PASSWORD_SUCCESS:
      return {
        ...state,
        setPasswordLoading: false,
        setPasswordSuccess: action.payload
      };

    case SET_PASSWORD_ERROR:
      return {
        ...state,
        setPasswordLoading: false,
        setPasswordError: action.error
      };

    case UPDATE_EMAIL:
      return {
        ...state,
        updateEmailLoading: true,
        updateEmailSuccess: "",
        updateEmailError: ""
      };

    case UPDATE_EMAIL_SUCCESS:
      return {
        ...state,
        updateEmailLoading: false,
        updateEmailSuccess: action.payload
      };

    case UPDATE_EMAIL_ERROR:
      return {
        ...state,
        updateEmailLoading: false,
        updateEmailError: action.error
      };

    case CLEAR_SET_PASSWORD_MESSAGE:
      return {
        ...state,
        setPasswordLoading: false,
        setPasswordError: "",
        setPasswordSuccess: "",
        updateEmailError: "",
        updateEmailSuccess: ""
      };

    default:
      return state;
  }
};
