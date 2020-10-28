import {
  GET_VENDOR_INFO,
  GET_VENDOR_INFO_SUCCESS,
  GET_VENDOR_INFO_ERROR,
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

export const clearData = error => ({
  type: CLEAR_DATA,
  error
});
