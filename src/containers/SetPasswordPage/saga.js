import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { SET_PASSWORD } from "./constants";
import { setPasswordSuccess, setPasswordError } from "./actions";
import { loginSuccess } from "containers/LoginPage/actions";
import { getProfileData } from "containers/LoginPage/saga";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* setPassword({ payload }) {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(request, "/set-password", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    yield put(setPasswordSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(setPasswordError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(SET_PASSWORD, setPassword);
}
