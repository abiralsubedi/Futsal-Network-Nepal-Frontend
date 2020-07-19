import {
  SET_PASSWORD,
  SET_PASSWORD_ERROR,
  SET_PASSWORD_SUCCESS,
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
        setPasswordSuccess: false,
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

    case CLEAR_SET_PASSWORD_MESSAGE:
      return {
        ...state,
        setPasswordLoading: false,
        setPasswordError: ""
      };

    default:
      return state;
  }
};
