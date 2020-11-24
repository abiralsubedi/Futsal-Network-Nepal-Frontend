import {
  GET_DASHBOARD_INFO,
  GET_DASHBOARD_INFO_ERROR,
  GET_DASHBOARD_INFO_SUCCESS,
  GET_CURRENT_BOOKING,
  GET_CURRENT_BOOKING_ERROR,
  GET_CURRENT_BOOKING_SUCCESS,
  CLEAR_DASHBOARD_PAGE
} from "./constants";

export const getDashboardInfo = payload => ({
  type: GET_DASHBOARD_INFO,
  payload
});

export const getDashboardInfoSuccess = payload => ({
  type: GET_DASHBOARD_INFO_SUCCESS,
  payload
});
export const getDashboardInfoError = error => ({
  type: GET_DASHBOARD_INFO_ERROR,
  error
});

export const getCurrentBooking = payload => ({
  type: GET_CURRENT_BOOKING,
  payload
});

export const getCurrentBookingSuccess = payload => ({
  type: GET_CURRENT_BOOKING_SUCCESS,
  payload
});
export const getCurrentBookingError = error => ({
  type: GET_CURRENT_BOOKING_ERROR,
  error
});

export const clearDashboardPage = () => ({
  type: CLEAR_DASHBOARD_PAGE
});
