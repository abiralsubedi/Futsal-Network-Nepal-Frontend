import {
  POST_PROFILE_PICTURE,
  POST_PROFILE_PICTURE_ERROR,
  POST_PROFILE_PICTURE_SUCCESS,
  CLEAR_MESSAGE
} from "./constants";

export default (
  state = {
    postProfilePictureLoading: false,
    postProfilePictureSuccess: "",
    postProfilePictureError: ""
  },
  action
) => {
  switch (action.type) {
    case POST_PROFILE_PICTURE:
      return {
        ...state,
        postProfilePictureLoading: true,
        postProfilePictureSuccess: "",
        postProfilePictureError: ""
      };
    case POST_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        postProfilePictureLoading: false,
        postProfilePictureSuccess: action.message
      };
    case POST_PROFILE_PICTURE_ERROR:
      return {
        ...state,
        postProfilePictureLoading: false,
        postProfilePictureError: action.error
      };

    case CLEAR_MESSAGE:
      return {
        ...state,
        postProfilePictureSuccess: "",
        postProfilePictureError: ""
      };

    default:
      return state;
  }
};
