import {
  GET_VENDOR_LIST,
  GET_VENDOR_LIST_ERROR,
  GET_VENDOR_LIST_SUCCESS,
  CLEAR_VENDOR_DATA
} from "./constants";

export const getVendorList = payload => ({
  type: GET_VENDOR_LIST,
  payload
});

export const getVendorListSuccess = payload => ({
  type: GET_VENDOR_LIST_SUCCESS,
  payload
});
export const getVendorListError = error => ({
  type: GET_VENDOR_LIST_ERROR,
  error
});

export const clearVendorData = () => ({
  type: CLEAR_VENDOR_DATA
});
