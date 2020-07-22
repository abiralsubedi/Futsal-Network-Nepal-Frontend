import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { REGISTER } from "./constants";
import { registerSuccess, registerError } from "./actions";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* register({ payload }) {
  try {
    const response = yield call(request, "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (response.success) {
      yield put(registerSuccess(response));
    }
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(registerError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(REGISTER, register);
}
