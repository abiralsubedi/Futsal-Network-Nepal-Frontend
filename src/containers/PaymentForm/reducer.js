import {
  POST_PAYMENT_INTENT,
  POST_PAYMENT_INTENT_ERROR,
  POST_PAYMENT_INTENT_SUCCESS,
  CLEAR_MESSAGE
} from "./constants";

export default (
  state = {
    postPaymentIntentLoading: false,
    postPaymentIntentSuccess: "",
    postPaymentIntentError: ""
  },
  action
) => {
  switch (action.type) {
    case POST_PAYMENT_INTENT:
      return {
        ...state,
        postPaymentIntentLoading: true,
        postPaymentIntentSuccess: "",
        postPaymentIntentError: ""
      };
    case POST_PAYMENT_INTENT_SUCCESS:
      return {
        ...state,
        postPaymentIntentLoading: false,
        postPaymentIntentSuccess: action.message
      };
    case POST_PAYMENT_INTENT_ERROR:
      return {
        ...state,
        postPaymentIntentLoading: false,
        postPaymentIntentError: action.error
      };

    case CLEAR_MESSAGE:
      return {
        ...state,
        postPaymentIntentSuccess: "",
        postPaymentIntentError: ""
      };

    default:
      return state;
  }
};
