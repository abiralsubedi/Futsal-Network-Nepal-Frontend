import {
  GET_VENDOR_INFO,
  GET_VENDOR_INFO_ERROR,
  GET_VENDOR_INFO_SUCCESS,
  CLEAR_DATA
} from "./constants";

export default (
  state = {
    getVendorProfileLoading: false,
    vendorProfile: false,
    getVendorProfileError: ""
  },
  action
) => {
  switch (action.type) {
    case GET_VENDOR_INFO:
      return {
        ...state,
        getVendorProfileLoading: true,
        vendorProfile: false,
        getVendorProfileError: ""
      };
    case GET_VENDOR_INFO_SUCCESS:
      return {
        ...state,
        getVendorProfileLoading: false,
        vendorProfile: action.payload
      };
    case GET_VENDOR_INFO_ERROR:
      return {
        ...state,
        getVendorProfileLoading: false,
        getVendorProfileError: action.error
      };

    case CLEAR_DATA:
      return {
        ...state,
        vendorProfile: false,
        getVendorProfileError: ""
      };

    default:
      return state;
  }
};
