import {
  GET_BOOKING_DETAIL,
  GET_BOOKING_DETAIL_ERROR,
  GET_BOOKING_DETAIL_SUCCESS,
  REMOVE_BOOKING,
  REMOVE_BOOKING_ERROR,
  REMOVE_BOOKING_SUCCESS,
  CLEAR_POST_DATA
} from "./constants";

export default (
  state = {
    getBookingDetailLoading: false,
    bookingDetail: {},
    getBookingDetailError: "",
    removeBookingLoading: false,
    removeBookingSuccess: "",
    removeBookingError: ""
  },
  action
) => {
  switch (action.type) {
    case GET_BOOKING_DETAIL:
      return {
        ...state,
        getBookingDetailLoading: true,
        bookingDetail: {},
        getBookingDetailError: ""
      };
    case GET_BOOKING_DETAIL_SUCCESS:
      return {
        ...state,
        getBookingDetailLoading: false,
        bookingDetail: action.payload
      };
    case GET_BOOKING_DETAIL_ERROR:
      return {
        ...state,
        getBookingDetailLoading: false,
        getBookingDetailError: action.error
      };

    case REMOVE_BOOKING:
      return {
        ...state,
        removeBookingLoading: true,
        removeBookingSuccess: "",
        removeBookingError: ""
      };
    case REMOVE_BOOKING_SUCCESS:
      return {
        ...state,
        removeBookingLoading: false,
        removeBookingSuccess: action.payload
      };
    case REMOVE_BOOKING_ERROR:
      return {
        ...state,
        removeBookingLoading: false,
        removeBookingError: action.error
      };

    case CLEAR_POST_DATA:
      return {
        ...state,
        removeBookingSuccess: "",
        removeBookingError: ""
      };

    default:
      return state;
  }
};
