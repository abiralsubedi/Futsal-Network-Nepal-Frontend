import {
  GET_DASHBOARD_INFO,
  GET_DASHBOARD_INFO_ERROR,
  GET_DASHBOARD_INFO_SUCCESS,
  GET_CURRENT_BOOKING,
  GET_CURRENT_BOOKING_ERROR,
  GET_CURRENT_BOOKING_SUCCESS,
  CLEAR_DASHBOARD_PAGE
} from "./constants";

export default (
  state = {
    dashboardInfoLoading: false,
    dashboardInfo: false,
    dashboardInfoError: "",
    currentBookingLoading: false,
    currentBooking: [],
    currentBookingError: ""
  },
  action
) => {
  switch (action.type) {
    case GET_DASHBOARD_INFO:
      return {
        ...state,
        dashboardInfoLoading: true,
        dashboardInfoError: "",
        dashboardInfo: false
      };
    case GET_DASHBOARD_INFO_SUCCESS:
      return {
        ...state,
        dashboardInfoLoading: false,
        dashboardInfo: action.payload
      };
    case GET_DASHBOARD_INFO_ERROR:
      return {
        ...state,
        dashboardInfoLoading: false,
        dashboardInfoError: action.error
      };

    case GET_CURRENT_BOOKING:
      return {
        ...state,
        currentBookingLoading: true,
        currentBookingError: "",
        currentBooking: []
      };
    case GET_CURRENT_BOOKING_SUCCESS:
      return {
        ...state,
        currentBookingLoading: false,
        currentBooking: action.payload
      };
    case GET_CURRENT_BOOKING_ERROR:
      return {
        ...state,
        currentBookingLoading: false,
        currentBookingError: action.error
      };

    case CLEAR_DASHBOARD_PAGE:
      return {
        ...state,
        dashboardInfo: false,
        dashboardInfoError: "",
        currentBookingError: "",
        currentBooking: []
      };

    default:
      return state;
  }
};
