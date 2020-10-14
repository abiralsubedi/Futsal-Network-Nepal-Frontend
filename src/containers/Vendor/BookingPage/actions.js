import {
  GET_FIELD,
  GET_FIELD_ERROR,
  GET_FIELD_SUCCESS,
  GET_GAME_HOUR,
  GET_GAME_HOUR_ERROR,
  GET_GAME_HOUR_SUCCESS,
  POST_BOOKING,
  POST_BOOKING_ERROR,
  POST_BOOKING_SUCCESS,
  CLEAR_BOOKING_DATA,
  CLEAR_POST_DATA
} from "./constants";

export const getField = payload => ({
  type: GET_FIELD,
  payload
});

export const getFieldSuccess = payload => ({
  type: GET_FIELD_SUCCESS,
  payload
});
export const getFieldError = error => ({
  type: GET_FIELD_ERROR,
  error
});

export const getGameHour = payload => ({
  type: GET_GAME_HOUR,
  payload
});

export const getGameHourSuccess = payload => ({
  type: GET_GAME_HOUR_SUCCESS,
  payload
});
export const getGameHourError = error => ({
  type: GET_GAME_HOUR_ERROR,
  error
});

export const postBooking = payload => ({
  type: POST_BOOKING,
  payload
});

export const postBookingSuccess = payload => ({
  type: POST_BOOKING_SUCCESS,
  payload
});
export const postBookingError = error => ({
  type: POST_BOOKING_ERROR,
  error
});

export const clearBookingData = () => ({
  type: CLEAR_BOOKING_DATA
});

export const clearPostData = () => ({
  type: CLEAR_POST_DATA
});
