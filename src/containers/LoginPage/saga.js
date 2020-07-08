import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { LOGIN, GET_PROFILE_INFO } from "./constants";
import {
  loginSuccess,
  loginError,
  getProfileInfoSuccess,
  getProfileInfoError
} from "./actions";

export function* getProfileData() {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(request, "/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    localStorage.setItem("profile", JSON.stringify(response));
    yield put(getProfileInfoSuccess(response));
    yield put(loginSuccess({ token: token }));
  } catch (error) {
    yield put(getProfileInfoError(error));
  }
}

function* login({ payload }) {
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
      yield* getProfileData();
      yield put(loginSuccess(response));
    }
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(loginError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(GET_PROFILE_INFO, getProfileData);
}
