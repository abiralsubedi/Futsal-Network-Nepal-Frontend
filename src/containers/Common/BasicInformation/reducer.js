import {
  POST_PROFILE_INFO,
  POST_PROFILE_INFO_ERROR,
  POST_PROFILE_INFO_SUCCESS,
  POST_CHANGE_EMAIL,
  POST_CHANGE_EMAIL_ERROR,
  POST_CHANGE_EMAIL_SUCCESS,
  CLEAR_MESSAGE
} from "./constants";

export default (
  state = {
    postProfileLoading: false,
    postProfileSuccess: "",
    postProfileError: "",
    postChangeEmailLoading: false,
    postChangeEmailSuccess: "",
    postChangeEmailError: ""
  },
  action
) => {
  switch (action.type) {
    case POST_PROFILE_INFO:
      return {
        ...state,
        postProfileLoading: true,
        postProfileSuccess: "",
        postProfileError: ""
      };
    case POST_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        postProfileLoading: false,
        postProfileSuccess: action.message
      };
    case POST_PROFILE_INFO_ERROR:
      return {
        ...state,
        postProfileLoading: false,
        postProfileError: action.error
      };

    case POST_CHANGE_EMAIL:
      return {
        ...state,
        postChangeEmailLoading: true,
        postChangeEmailSuccess: "",
        postChangeEmailError: ""
      };
    case POST_CHANGE_EMAIL_SUCCESS:
      return {
        ...state,
        postChangeEmailLoading: false,
        postChangeEmailSuccess: action.message
      };
    case POST_CHANGE_EMAIL_ERROR:
      return {
        ...state,
        postChangeEmailLoading: false,
        postChangeEmailError: action.error
      };

    case CLEAR_MESSAGE:
      return {
        ...state,
        postProfileSuccess: "",
        postProfileError: "",
        postChangeEmailSuccess: "",
        postChangeEmailError: ""
      };

    default:
      return state;
  }
};
