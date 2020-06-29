import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { POST_PASSWORD } from "./constants";
import { postPasswordSuccess, postPasswordError } from "./actions";

function* postPassword({ payload }) {
  console.log(payload, "password saga payload");
  try {
    const token = localStorage.getItem("token");
    const response = yield call(request, "/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    yield put(postPasswordSuccess("Password Changed successfully!"));
  } catch (error) {
    yield put(postPasswordError("Password Change Failed!"));
  }
}

export default function* mySaga() {
  yield takeLatest(POST_PASSWORD, postPassword);
}
