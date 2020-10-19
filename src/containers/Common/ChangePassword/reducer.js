import {
  POST_PASSWORD,
  POST_PASSWORD_ERROR,
  POST_PASSWORD_SUCCESS,
  UNLINK_EMAIL,
  CLEAR_MESSAGE
} from "./constants";

export default (
  state = {
    postPasswordLoading: false,
    postPasswordSuccess: "",
    postPasswordError: ""
  },
  action
) => {
  switch (action.type) {
    case POST_PASSWORD:
      return {
        ...state,
        postPasswordLoading: true,
        postPasswordSuccess: "",
        postPasswordError: ""
      };
    case POST_PASSWORD_SUCCESS:
      return {
        ...state,
        postPasswordLoading: false,
        postPasswordSuccess: action.message
      };
    case POST_PASSWORD_ERROR:
      return {
        ...state,
        postPasswordLoading: false,
        postPasswordError: action.error
      };

    case UNLINK_EMAIL:
      return {
        ...state,
        postPasswordLoading: true,
        postPasswordSuccess: "",
        postPasswordError: ""
      };

    case CLEAR_MESSAGE:
      return {
        ...state,
        postPasswordSuccess: "",
        postPasswordError: ""
      };

    default:
      return state;
  }
};
