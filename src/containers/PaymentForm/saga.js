import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { POST_PAYMENT_INTENT } from "./constants";
import { postPaymentIntentSuccess, postPaymentIntentError } from "./actions";

function* postPaymentIntent({ payload }) {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(request, "/payment/create-payment-intent", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    // const response = yield call(request, "/profile", {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // });
    yield put(postPaymentIntentSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(postPaymentIntentError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(POST_PAYMENT_INTENT, postPaymentIntent);
}
