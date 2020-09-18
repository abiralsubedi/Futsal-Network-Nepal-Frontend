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

    const response = yield call(request, `/vendor/${vendorId}/field`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    yield put(getDescriptionInfoSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(getDescriptionInfoError(errorObj.message));
  }
}

function* postDescriptionInfo({ payload }) {
  try {
    const { vendorId, fieldId } = payload;
    const token = localStorage.getItem("token");

    yield call(request, `/vendor/${vendorId}/field`, {
      method: fieldId ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const response = `Field ${fieldId ? "updated" : "created"} successfully.`;
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
