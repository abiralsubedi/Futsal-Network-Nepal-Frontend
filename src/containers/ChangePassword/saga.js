import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { POST_PASSWORD, UNLINK_EMAIL } from "./constants";
import { postPasswordSuccess, postPasswordError } from "./actions";

function* postPassword({ payload }) {
  try {
    const token = localStorage.getItem("token");
    yield call(request, "/change-password", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    yield put(postPasswordSuccess("Password Changed successfully!"));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(postPasswordError(errorObj.message));
  }
}

function* unLinkEmail() {
  try {
    const token = localStorage.getItem("token");
    yield call(request, "/unlink-email", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    yield put(
      postPasswordSuccess("You will shortly receive email to set password.")
    );
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(postPasswordError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(POST_PASSWORD, postPassword);
  yield takeLatest(UNLINK_EMAIL, unLinkEmail);
}
