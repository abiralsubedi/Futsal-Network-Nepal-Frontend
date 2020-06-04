import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { LOGIN } from "./constants";
import { loginSuccess, loginError } from "./actions";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* login(payload) {
  console.log(payload, "payload");
  try {
    const response = yield call(request, "/health", {
      method: "GET"
    });
    if (response.success) {
      yield put(loginSuccess(response));
    }
  } catch (e) {
    console.error(e);
  }
}

export default function* mySaga() {
  yield takeLatest(LOGIN, login);
}
