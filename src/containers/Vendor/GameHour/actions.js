import {
  GET_GAME_HOUR,
  GET_GAME_HOUR_ERROR,
  GET_GAME_HOUR_SUCCESS,
  POST_GAME_HOUR,
  POST_GAME_HOUR_ERROR,
  POST_GAME_HOUR_SUCCESS,
  REMOVE_GAME_HOUR,
  REMOVE_GAME_HOUR_ERROR,
  REMOVE_GAME_HOUR_SUCCESS,
  CLEAR_GAME_HOUR_DATA,
  CLEAR_POST_DATA
} from "./constants";

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

export const postGameHour = payload => ({
  type: POST_GAME_HOUR,
  payload
});

export const postGameHourSuccess = payload => ({
  type: POST_GAME_HOUR_SUCCESS,
  payload
});
export const postGameHourError = error => ({
  type: POST_GAME_HOUR_ERROR,
  error
});

export const removeGameHour = payload => ({
  type: REMOVE_GAME_HOUR,
  payload
});

export const removeGameHourSuccess = payload => ({
  type: REMOVE_GAME_HOUR_SUCCESS,
  payload
});
export const removeGameHourError = error => ({
  type: REMOVE_GAME_HOUR_ERROR,
  error
});

export const clearGameHourData = () => ({
  type: CLEAR_GAME_HOUR_DATA
});

export const clearPostData = () => ({
  type: CLEAR_POST_DATA
});
