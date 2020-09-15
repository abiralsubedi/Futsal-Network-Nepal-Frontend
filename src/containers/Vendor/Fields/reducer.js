import {
  GET_FIELD_INFO,
  GET_FIELD_INFO_ERROR,
  GET_FIELD_INFO_SUCCESS,
  POST_FIELD_INFO,
  POST_FIELD_INFO_ERROR,
  POST_FIELD_INFO_SUCCESS,
  CLEAR_FIELD_DATA
} from "./constants";

export default (
  state = {
    fieldInfoLoading: false,
    fieldInfo: [],
    fieldInfoError: "",
    postFieldInfoLoading: false,
    postFieldInfoSuccess: "",
    postFieldInfoError: ""
  },
  action
) => {
  switch (action.type) {
    case GET_FIELD_INFO:
      return {
        ...state,
        fieldInfoLoading: true,
        fieldInfo: [],
        fieldInfoError: ""
      };
    case GET_FIELD_INFO_SUCCESS:
      return {
        ...state,
        fieldInfoLoading: false,
        fieldInfo: action.payload
      };
    case GET_FIELD_INFO_ERROR:
      return {
        ...state,
        fieldInfoLoading: false,
        fieldInfoError: action.error
      };

    case POST_FIELD_INFO:
      return {
        ...state,
        postFieldInfoLoading: true,
        postFieldInfoSuccess: "",
        postFieldInfoError: ""
      };
    case POST_FIELD_INFO_SUCCESS:
      return {
        ...state,
        postFieldInfoLoading: false,
        postFieldInfoSuccess: action.payload
      };
    case POST_FIELD_INFO_ERROR:
      return {
        ...state,
        postFieldInfoLoading: false,
        postFieldInfoError: action.error
      };

    case CLEAR_FIELD_DATA:
      return {
        ...state,
        postFieldInfoLoading: false,
        postFieldInfoSuccess: "",
        postFieldInfoError: ""
      };

    default:
      return state;
  }
};
