import {
  GET_VENDOR_INFO,
  GET_VENDOR_INFO_SUCCESS,
  GET_VENDOR_INFO_ERROR,
  GET_VENDOR_DISTANCE,
  GET_VENDOR_DISTANCE_SUCCESS,
  GET_VENDOR_DISTANCE_ERROR,
  GET_VENDOR_ADDITIONAL_INFO,
  GET_VENDOR_ADDITIONAL_INFO_ERROR,
  GET_VENDOR_ADDITIONAL_INFO_SUCCESS,
  SET_VENDOR_INFO,
  CLEAR_VENDOR_DISTANCE,
  CLEAR_DATA
} from "./constants";

export const getVendorInfo = vendorId => ({
  type: GET_VENDOR_INFO,
  vendorId
});

export const getVendorInfoSuccess = payload => ({
  type: GET_VENDOR_INFO_SUCCESS,
  payload
});
export const getVendorInfoError = error => ({
  type: GET_VENDOR_INFO_ERROR,
  error
});

export const getVendorDistance = payload => ({
  type: GET_VENDOR_DISTANCE,
  payload
});

export const getVendorDistanceSuccess = payload => ({
  type: GET_VENDOR_DISTANCE_SUCCESS,
  payload
});
export const getVendorDistanceError = error => ({
  type: GET_VENDOR_DISTANCE_ERROR,
  error
});

export const getVendorAdditionalInfo = payload => ({
  type: GET_VENDOR_ADDITIONAL_INFO,
  payload
});

export const getVendorAdditionalInfoSuccess = payload => ({
  type: GET_VENDOR_ADDITIONAL_INFO_SUCCESS,
  payload
});
export const getVendorAdditionalInfoError = error => ({
  type: GET_VENDOR_ADDITIONAL_INFO_ERROR,
  error
});

export const setVendorInfo = payload => ({
  type: SET_VENDOR_INFO,
  payload
});

export const clearVendorDistance = () => ({
  type: CLEAR_VENDOR_DISTANCE
});

export const clearData = () => ({
  type: CLEAR_DATA
});
