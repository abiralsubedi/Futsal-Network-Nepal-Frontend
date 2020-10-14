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

export default (
  state = {
    getFieldLoading: false,
    field: [],
    getFieldError: "",
    getGameHourLoading: false,
    gameHour: [],
    getGameHourError: "",
    postBookingLoading: false,
    postBookingSuccess: "",
    postBookingError: ""
  },
  action
) => {
  switch (action.type) {
    case GET_FIELD:
      return {
        ...state,
        getFieldLoading: true,
        getFieldError: ""
      };
    case GET_FIELD_SUCCESS:
      return {
        ...state,
        getFieldLoading: false,
        field: action.payload
      };
    case GET_FIELD_ERROR:
      return {
        ...state,
        getFieldLoading: false,
        getFieldError: action.error
      };

    case GET_GAME_HOUR:
      return {
        ...state,
        getGameHourLoading: true,
        gameHour: [],
        getGameHourError: ""
      };
    case GET_GAME_HOUR_SUCCESS:
      return {
        ...state,
        getGameHourLoading: false,
        gameHour: action.payload
      };
    case GET_GAME_HOUR_ERROR:
      return {
        ...state,
        getGameHourLoading: false,
        getGameHourError: action.error
      };

    case POST_BOOKING:
      return {
        ...state,
        postBookingLoading: true,
        postBookingSuccess: "",
        postBookingError: ""
      };
    case POST_BOOKING_SUCCESS:
      return {
        ...state,
        postBookingLoading: false,
        postBookingSuccess: action.payload
      };
    case POST_BOOKING_ERROR:
      return {
        ...state,
        postBookingLoading: false,
        postBookingError: action.error
      };

    case CLEAR_BOOKING_DATA:
      return {
        ...state,
        gameHour: [],
        getGameHourError: ""
      };

    case CLEAR_POST_DATA:
      return {
        ...state,
        postBookingSuccess: "",
        postBookingError: ""
      };

    default:
      return state;
  }
};
