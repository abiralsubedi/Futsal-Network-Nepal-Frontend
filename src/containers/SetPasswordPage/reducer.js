import {
  SET_PASSWORD,
  SET_PASSWORD_ERROR,
  SET_PASSWORD_SUCCESS,
  UPDATE_EMAIL,
  UNLINK_EMAIL,
  CLEAR_SET_PASSWORD_MESSAGE
} from "./constants";

export const initialState = {
  setPasswordLoading: false,
  setPasswordSuccess: "",
  setPasswordError: ""
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
        setPasswordSuccess: action.message
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
        setPasswordLoading: true,
        setPasswordSuccess: "",
        setPasswordError: ""
      };

    case UNLINK_EMAIL:
      return {
        ...state,
        setPasswordLoading: true,
        setPasswordSuccess: "",
        setPasswordError: ""
      };

    case CLEAR_SET_PASSWORD_MESSAGE:
      return {
        ...state,
        setPasswordError: "",
        setPasswordSuccess: ""
      };

    default:
      return state;
  }
};
