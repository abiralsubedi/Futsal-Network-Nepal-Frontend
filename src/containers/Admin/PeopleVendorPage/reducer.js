import {
  GET_USER_LIST,
  GET_USER_LIST_ERROR,
  GET_USER_LIST_SUCCESS,
  CLEAR_USER_LIST_DATA
} from "./constants";

export default (
  state = {
    userListLoading: false,
    userListData: {},
    userListError: ""
  },
  action
) => {
  switch (action.type) {
    case GET_USER_LIST:
      return {
        ...state,
        userListLoading: true,
        userListData: {},
        userListError: ""
      };
    case GET_USER_LIST_SUCCESS:
      return {
        ...state,
        userListLoading: false,
        userListData: action.payload
      };
    case GET_USER_LIST_ERROR:
      return {
        ...state,
        userListLoading: false,
        userListError: action.error
      };

    case CLEAR_USER_LIST_DATA:
      return {
        ...state,
        userListData: {},
        userListLoading: false,
        userListError: ""
      };

    default:
      return state;
  }
};
