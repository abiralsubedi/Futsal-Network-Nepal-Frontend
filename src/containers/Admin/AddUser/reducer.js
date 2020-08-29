import {
  POST_PROFILE_INFO,
  POST_PROFILE_INFO_ERROR,
  POST_PROFILE_INFO_SUCCESS,
  GET_PROFILE_INFO,
  GET_PROFILE_INFO_ERROR,
  GET_PROFILE_INFO_SUCCESS,
  UPDATE_USER_PHOTO,
  CLEAR_USER_INFO,
  CLEAR_MESSAGE
} from "./constants";

export default (
  state = {
    postProfileLoading: false,
    postProfileSuccess: "",
    postProfileError: "",
    getProfileInfoLoading: false,
    profileInfo: false,
    getProfileInfoError: ""
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
        postProfileSuccess: action.payload
      };
    case POST_PROFILE_INFO_ERROR:
      return {
        ...state,
        postProfileLoading: false,
        postProfileError: action.error
      };

    case GET_PROFILE_INFO:
      return {
        ...state,
        getProfileInfoLoading: true,
        profileInfo: false,
        getProfileInfoError: ""
      };
    case GET_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        getProfileInfoLoading: false,
        profileInfo: action.payload
      };
    case GET_PROFILE_INFO_ERROR:
      return {
        ...state,
        getProfileInfoLoading: false,
        getProfileInfoError: action.error
      };

    case UPDATE_USER_PHOTO:
      return {
        ...state,
        profileInfo: { ...state.profileInfo, photoUri: action.photoUri }
      };

    case CLEAR_USER_INFO:
      return {
        ...state,
        profileInfo: false
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
