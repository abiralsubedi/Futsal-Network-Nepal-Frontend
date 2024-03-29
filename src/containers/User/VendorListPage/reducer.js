import {
  GET_VENDOR_LIST,
  GET_VENDOR_LIST_ERROR,
  GET_VENDOR_LIST_SUCCESS,
  SET_FILTER_OPTIONS,
  CLEAR_VENDOR_DATA
} from "./constants";

export default (
  state = {
    vendorListLoading: false,
    vendorList: [],
    vendorListError: "",
    filterOptions: false
  },
  action
) => {
  switch (action.type) {
    case GET_VENDOR_LIST:
      return {
        ...state,
        vendorListLoading: true,
        vendorListError: "",
        vendorList: []
      };
    case GET_VENDOR_LIST_SUCCESS:
      return {
        ...state,
        vendorListLoading: false,
        vendorList: action.payload
      };
    case GET_VENDOR_LIST_ERROR:
      return {
        ...state,
        vendorListLoading: false,
        vendorListError: action.error
      };

    case SET_FILTER_OPTIONS:
      return {
        ...state,
        filterOptions: action.payload
      };

    case CLEAR_VENDOR_DATA:
      return {
        ...state,
        vendorList: [],
        vendorListError: ""
      };

    default:
      return state;
  }
};
