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

export default (
  state = {
    gameHourLoading: false,
    gameHour: [],
    gameHourError: "",
    postGameHourLoading: false,
    postGameHourSuccess: "",
    postGameHourError: "",
    removeGameHourLoading: false,
    removeGameHourSuccess: "",
    removeGameHourError: ""
  },
  action
) => {
  switch (action.type) {
    case GET_GAME_HOUR:
      return {
        ...state,
        gameHourLoading: true,
        gameHour: [],
        gameHourError: ""
      };
    case GET_GAME_HOUR_SUCCESS:
      return {
        ...state,
        gameHourLoading: false,
        gameHour: action.payload
      };
    case GET_GAME_HOUR_ERROR:
      return {
        ...state,
        gameHourLoading: false,
        gameHourError: action.error
      };

    case POST_GAME_HOUR:
      return {
        ...state,
        postGameHourLoading: true,
        postGameHourSuccess: "",
        postGameHourError: ""
      };
    case POST_GAME_HOUR_SUCCESS:
      return {
        ...state,
        postGameHourLoading: false,
        postGameHourSuccess: action.payload
      };
    case POST_GAME_HOUR_ERROR:
      return {
        ...state,
        postGameHourLoading: false,
        postGameHourError: action.error
      };

    case REMOVE_GAME_HOUR:
      return {
        ...state,
        removeGameHourLoading: true,
        removeGameHourSuccess: "",
        removeGameHourError: ""
      };
    case REMOVE_GAME_HOUR_SUCCESS:
      return {
        ...state,
        removeGameHourLoading: false,
        removeGameHourSuccess: action.payload
      };
    case REMOVE_GAME_HOUR_ERROR:
      return {
        ...state,
        removeGameHourLoading: false,
        removeGameHourError: action.error
      };

    case CLEAR_GAME_HOUR_DATA:
      return {
        ...state,
        gameHour: [],
        gameHourLoading: false,
        gameHourError: ""
      };

    case CLEAR_POST_DATA:
      return {
        ...state,
        postGameHourSuccess: "",
        postGameHourError: "",
        postGameHourLoading: false,
        removeGameHourLoading: false,
        removeGameHourSuccess: "",
        removeGameHourError: ""
      };

    default:
      return state;
  }
};
