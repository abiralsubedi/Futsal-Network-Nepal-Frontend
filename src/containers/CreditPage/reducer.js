import {
  GET_CREDIT_HISTORY,
  GET_CREDIT_HISTORY_ERROR,
  GET_CREDIT_HISTORY_SUCCESS,
  CLEAR_CREDIT_HISTORY
} from "./constants";

export default (
  state = {
    creditHistoryLoading: false,
    creditHistory: [],
    creditHistoryError: ""
  },
  action
) => {
  switch (action.type) {
    case GET_CREDIT_HISTORY:
      return {
        ...state,
        creditHistoryLoading: true,
        creditHistoryError: ""
      };
    case GET_CREDIT_HISTORY_SUCCESS:
      return {
        ...state,
        creditHistoryLoading: false,
        creditHistory: action.payload
      };
    case GET_CREDIT_HISTORY_ERROR:
      return {
        ...state,
        creditHistoryLoading: false,
        creditHistoryError: action.error
      };

    case CLEAR_CREDIT_HISTORY:
      return {
        ...state,
        creditHistory: [],
        creditHistoryLoading: false,
        creditHistoryError: ""
      };

    default:
      return state;
  }
};
