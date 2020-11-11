import {
  GET_VENDOR_LIST,
  GET_VENDOR_LIST_ERROR,
  GET_VENDOR_LIST_SUCCESS,
  CLEAR_VENDOR_DATA
} from "./constants";

export default (
  state = {
    vendorListLoading: false,
    vendorList: [],
    vendorListError: ""
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
