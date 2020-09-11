import {
  GET_GAME_HOUR,
  GET_GAME_HOUR_ERROR,
  GET_GAME_HOUR_SUCCESS,
  POST_GAME_HOUR,
  POST_GAME_HOUR_ERROR,
  POST_GAME_HOUR_SUCCESS,
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
    postGameHourError: ""
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
        postGameHourLoading: false
      };

    default:
      return state;
  }
};
