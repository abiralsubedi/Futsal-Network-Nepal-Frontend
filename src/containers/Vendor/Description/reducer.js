import {
  POST_DESCRIPTION,
  POST_DESCRIPTION_ERROR,
  POST_DESCRIPTION_SUCCESS,
  CLEAR_DESCRIPTION_DATA
} from "./constants";

export default (
  state = {
    postDescriptionInfoLoading: false,
    postDescriptionInfoSuccess: "",
    postDescriptionInfoError: ""
  },
  action
) => {
  switch (action.type) {
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
