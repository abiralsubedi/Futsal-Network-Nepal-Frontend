import {
  POST_PROFILE_INFO,
  POST_PROFILE_INFO_ERROR,
  POST_PROFILE_INFO_SUCCESS,
  CLEAR_MESSAGE
} from "./constants";

export default (
  state = {
    postProfileLoading: false,
    postProfileSuccess: "",
    postProfileError: ""
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

    case CLEAR_MESSAGE:
      return {
        ...state,
        postProfileSuccess: "",
        postProfileError: ""
      };

    default:
      return state;
  }
};
