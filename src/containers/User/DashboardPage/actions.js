import {
  GET_RATED_VENDOR,
  GET_RATED_VENDOR_ERROR,
  GET_RATED_VENDOR_SUCCESS,
  GET_NEARBY_VENDOR,
  GET_NEARBY_VENDOR_ERROR,
  GET_NEARBY_VENDOR_SUCCESS,
  CLEAR_DASHBOARD_PAGE
} from "./constants";

export const getRatedVendor = payload => ({
  type: GET_RATED_VENDOR,
  payload
});

export const getRatedVendorSuccess = payload => ({
  type: GET_RATED_VENDOR_SUCCESS,
  payload
});
export const getRatedVendorError = error => ({
  type: GET_RATED_VENDOR_ERROR,
  error
});

export const getNearbyVendor = payload => ({
  type: GET_NEARBY_VENDOR,
  payload
});

export const getNearbyVendorSuccess = payload => ({
  type: GET_NEARBY_VENDOR_SUCCESS,
  payload
});
export const getNearbyVendorError = error => ({
  type: GET_NEARBY_VENDOR_ERROR,
  error
});

export const clearDashboardPage = () => ({
  type: CLEAR_DASHBOARD_PAGE
});
