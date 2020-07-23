import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { SET_PASSWORD, UPDATE_EMAIL, UNLINK_EMAIL } from "./constants";
import { setPasswordSuccess, setPasswordError } from "./actions";

function* setPassword({ payload }) {
  try {
    const { newPassword, token } = payload;
    yield call(request, "/set-password", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ newPassword })
    });
    yield put(
      setPasswordSuccess("Your password has been successfully updated.")
    );
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(setPasswordError(errorObj.message));
  }
}

function* updateEmail({ payload }) {
  try {
    const { password, token } = payload;
    yield call(request, "/confirm-email", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password })
    });
    yield put(setPasswordSuccess("Your email has been successfully updated."));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(setPasswordError(errorObj.message));
  }
}

function* unlinkEmail({ payload }) {
  try {
    const { newPassword, token } = payload;
    yield call(request, "/unlink-email", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ newPassword })
    });
    yield put(
      setPasswordSuccess("Your account has been unlinked from google.")
    );
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(setPasswordError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(SET_PASSWORD, setPassword);
  yield takeLatest(UPDATE_EMAIL, updateEmail);
  yield takeLatest(UNLINK_EMAIL, unlinkEmail);
}
