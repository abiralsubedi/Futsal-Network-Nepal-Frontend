import {
  GET_GLOBAL_SEARCH,
  GET_GLOBAL_SEARCH_ERROR,
  GET_GLOBAL_SEARCH_SUCCESS,
  CLEAR_GLOBAL_SEARCH
} from "./constants";

export default (
  state = {
    globalSearchLoading: false,
    globalSearch: [],
    globalSearchError: ""
  },
  action
) => {
  switch (action.type) {
    case GET_GLOBAL_SEARCH:
      return {
        ...state,
        globalSearchLoading: true,
        globalSearchError: "",
        globalSearch: []
      };
    case GET_GLOBAL_SEARCH_SUCCESS:
      return {
        ...state,
        globalSearchLoading: false,
        globalSearch: action.payload
      };
    case GET_GLOBAL_SEARCH_ERROR:
      return {
        ...state,
        globalSearchLoading: false,
        globalSearchError: action.error
      };

    case CLEAR_GLOBAL_SEARCH:
      return {
        ...state,
        globalSearch: [],
        globalSearchLoading: false,
        globalSearchError: ""
      };

    default:
      return state;
  }
};
