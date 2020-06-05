import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { LOGIN } from "./constants";
import { loginSuccess, loginError } from "./actions";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* login({ payload }) {
  console.log(payload, "payload");
  try {
    const response = yield call(request, "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (response.success) {
      localStorage.setItem("token", response.token);
      yield put(loginSuccess(response));
    }
  } catch (e) {
    yield put(loginError(e));
  }
}

export default function* mySaga() {
  yield takeLatest(LOGIN, login);
}
