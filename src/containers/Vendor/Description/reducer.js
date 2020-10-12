import {
  GET_DESCRIPTION_INFO,
  GET_DESCRIPTION_INFO_ERROR,
  GET_DESCRIPTION_INFO_SUCCESS,
  POST_DESCRIPTION,
  POST_DESCRIPTION_ERROR,
  POST_DESCRIPTION_SUCCESS,
  CLEAR_DESCRIPTION_DATA
} from "./constants";

export default (
  state = {
    descriptionInfoLoading: false,
    descriptionInfo: "",
    descriptionInfoError: "",
    postDescriptionInfoLoading: false,
    postDescriptionInfoSuccess: "",
    postDescriptionInfoError: ""
  },
  action
) => {
  switch (action.type) {
    case GET_DESCRIPTION_INFO:
      return {
        ...state,
        descriptionInfoLoading: true,
        descriptionInfo: "",
        descriptionInfoError: ""
      };
    case GET_DESCRIPTION_INFO_SUCCESS:
      return {
        ...state,
        descriptionInfoLoading: false,
        descriptionInfo: action.payload
      };
    case GET_DESCRIPTION_INFO_ERROR:
      return {
        ...state,
        descriptionInfoLoading: false,
        descriptionInfoError: action.error
      };

    case POST_DESCRIPTION:
      return {
        ...state,
        postDescriptionInfoLoading: true,
        postDescriptionInfoSuccess: "",
        postDescriptionInfoError: ""
      };
    case POST_DESCRIPTION_SUCCESS:
      return {
        ...state,
        postDescriptionInfoLoading: false,
        postDescriptionInfoSuccess: action.payload
      };
    case POST_DESCRIPTION_ERROR:
      return {
        ...state,
        postDescriptionInfoLoading: false,
        postDescriptionInfoError: action.error
      };

    case CLEAR_DESCRIPTION_DATA:
      return {
        ...state,
        postDescriptionInfoSuccess: "",
        postDescriptionInfoError: ""
      };

    default:
      return state;
  }
};
