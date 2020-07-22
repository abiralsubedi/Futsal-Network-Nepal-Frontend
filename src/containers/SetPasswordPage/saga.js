import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { SET_PASSWORD, UPDATE_EMAIL } from "./constants";
import {
  setPasswordSuccess,
  setPasswordError,
  updateEmailSuccess,
  updateEmailError
} from "./actions";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* setPassword({ payload }) {
  try {
    const { newPassword, token } = payload;
    const response = yield call(request, "/set-password", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ newPassword })
    });
    yield put(setPasswordSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(setPasswordError(errorObj.message));
  }
}

function* updateEmail({ payload }) {
  try {
    const { password, token } = payload;
    const response = yield call(request, "/confirm-email", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password })
    });
    yield put(updateEmailSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(updateEmailError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(SET_PASSWORD, setPassword);
  yield takeLatest(UPDATE_EMAIL, updateEmail);
}
