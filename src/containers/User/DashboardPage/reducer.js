import {
  GET_RATED_VENDOR,
  GET_RATED_VENDOR_ERROR,
  GET_RATED_VENDOR_SUCCESS,
  GET_NEARBY_VENDOR,
  GET_NEARBY_VENDOR_ERROR,
  GET_NEARBY_VENDOR_SUCCESS,
  CLEAR_DASHBOARD_PAGE
} from "./constants";

export default (
  state = {
    ratedVendorLoading: false,
    ratedVendor: [],
    ratedVendorError: "",
    nearbyVendorLoading: false,
    nearbyVendor: [],
    nearbyVendorError: "",
    fetchedNearbyVendor: false
  },
  action
) => {
  switch (action.type) {
    case GET_RATED_VENDOR:
      return {
        ...state,
        ratedVendorLoading: true,
        ratedVendorError: "",
        ratedVendor: []
      };
    case GET_RATED_VENDOR_SUCCESS:
      return {
        ...state,
        ratedVendorLoading: false,
        ratedVendor: action.payload
      };
    case GET_RATED_VENDOR_ERROR:
      return {
        ...state,
        ratedVendorLoading: false,
        ratedVendorError: action.error
      };

    case GET_NEARBY_VENDOR:
      return {
        ...state,
        nearbyVendorLoading: true,
        nearbyVendorError: "",
        nearbyVendor: []
      };
    case GET_NEARBY_VENDOR_SUCCESS:
      return {
        ...state,
        nearbyVendorLoading: false,
        nearbyVendor: action.payload,
        fetchedNearbyVendor: true
      };
    case GET_NEARBY_VENDOR_ERROR:
      return {
        ...state,
        nearbyVendorLoading: false,
        nearbyVendorError: action.error
      };

    case CLEAR_DASHBOARD_PAGE:
      return {
        ...state,
        ratedVendor: [],
        ratedVendorError: "",
        nearbyVendorError: "",
        nearbyVendor: []
      };

    default:
      return state;
  }
};
