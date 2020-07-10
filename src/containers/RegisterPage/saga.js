import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { REGISTER } from "./constants";
import { registerSuccess, registerError } from "./actions";
import { loginSuccess } from "containers/LoginPage/actions";
import { getProfileData } from "containers/LoginPage/saga";

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
      localStorage.setItem("token", response.token);
      yield call(getProfileData);
      yield put(registerSuccess(response));
      yield put(loginSuccess(response));
    }
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(registerError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(REGISTER, register);
}
