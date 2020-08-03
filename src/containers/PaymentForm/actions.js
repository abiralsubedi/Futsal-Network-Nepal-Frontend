import {
  POST_PAYMENT_INTENT,
  POST_PAYMENT_INTENT_ERROR,
  POST_PAYMENT_INTENT_SUCCESS,
  CLEAR_MESSAGE
} from "./constants";

export const postPaymentIntent = payload => {
  return { type: POST_PAYMENT_INTENT, payload };
};
export const postPaymentIntentSuccess = message => {
  return { type: POST_PAYMENT_INTENT_SUCCESS, message };
};
export const postPaymentIntentError = error => {
  return { type: POST_PAYMENT_INTENT_ERROR, error };
};

export const clearMessage = () => ({ type: CLEAR_MESSAGE });
