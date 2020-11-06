import {
  GET_VENDOR_INFO,
  GET_VENDOR_INFO_ERROR,
  GET_VENDOR_INFO_SUCCESS,
  GET_VENDOR_DISTANCE,
  GET_VENDOR_DISTANCE_ERROR,
  GET_VENDOR_DISTANCE_SUCCESS,
  SET_VENDOR_INFO,
  CLEAR_VENDOR_DISTANCE,
  CLEAR_DATA
} from "./constants";

export default (
  state = {
    getVendorProfileLoading: false,
    vendorProfile: false,
    getVendorProfileError: "",
    getVendorDistanceLoading: false,
    vendorDistance: false,
    getVendorDistanceError: ""
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

    case GET_VENDOR_DISTANCE:
      return {
        ...state,
        getVendorDistanceLoading: true,
        vendorDistance: false,
        getVendorDistanceError: ""
      };
    case GET_VENDOR_DISTANCE_SUCCESS:
      return {
        ...state,
        getVendorDistanceLoading: false,
        vendorDistance: action.payload
      };
    case GET_VENDOR_DISTANCE_ERROR:
      return {
        ...state,
        getVendorDistanceLoading: false,
        getVendorDistanceError: action.error
      };

    case SET_VENDOR_INFO:
      return {
        ...state,
        vendorProfile: action.payload
      };

    case CLEAR_VENDOR_DISTANCE:
      return {
        ...state,
        vendorDistance: false,
        getVendorDistanceLoading: false
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
