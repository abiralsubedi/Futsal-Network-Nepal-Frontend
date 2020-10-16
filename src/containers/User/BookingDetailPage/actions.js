import {
  GET_BOOKING_DETAIL,
  GET_BOOKING_DETAIL_ERROR,
  GET_BOOKING_DETAIL_SUCCESS,
  REMOVE_BOOKING,
  REMOVE_BOOKING_ERROR,
  REMOVE_BOOKING_SUCCESS,
  CLEAR_POST_DATA
} from "./constants";

export const getBookingDetail = payload => ({
  type: GET_BOOKING_DETAIL,
  payload
});

export const getBookingDetailSuccess = payload => ({
  type: GET_BOOKING_DETAIL_SUCCESS,
  payload
});
export const getBookingDetailError = error => ({
  type: GET_BOOKING_DETAIL_ERROR,
  error
});

export const removeBooking = payload => ({
  type: REMOVE_BOOKING,
  payload
});

export const removeBookingSuccess = payload => ({
  type: REMOVE_BOOKING_SUCCESS,
  payload
});
export const removeBookingError = error => ({
  type: REMOVE_BOOKING_ERROR,
  error
});

export const clearPostData = () => ({
  type: CLEAR_POST_DATA
});
