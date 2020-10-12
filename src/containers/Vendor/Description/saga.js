import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { GET_DESCRIPTION_INFO, POST_DESCRIPTION } from "./constants";
import {
  getDescriptionInfoError,
  getDescriptionInfoSuccess,
  postDescriptionInfoSuccess,
  postDescriptionInfoError
} from "./actions";

function* getDescriptionInfo({ payload }) {
  try {
    const { vendorId } = payload;
    const token = localStorage.getItem("token");

    const { description } = yield call(request, `/vendor/${vendorId}/info`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(description, "saga");
    yield put(getDescriptionInfoSuccess(description));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(getDescriptionInfoError(errorObj.message));
  }
}

function* postDescriptionInfo({ payload }) {
  try {
    const token = localStorage.getItem("token");
    const { vendorId } = payload;

    yield call(request, `/vendor/${vendorId}/description`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const response = "Description saved successfully";
    yield put(postDescriptionInfoSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(postDescriptionInfoError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(GET_DESCRIPTION_INFO, getDescriptionInfo);
  yield takeLatest(POST_DESCRIPTION, postDescriptionInfo);
}
