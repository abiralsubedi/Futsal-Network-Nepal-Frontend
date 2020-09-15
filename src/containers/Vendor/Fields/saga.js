import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { GET_FIELD_INFO, POST_FIELD_INFO } from "./constants";
import {
  getFieldInfoSuccess,
  getFieldInfoError,
  postFieldInfoSuccess,
  postFieldInfoError
} from "./actions";

function* getFieldInfo({ payload }) {
  try {
    const { vendorId } = payload;
    const token = localStorage.getItem("token");

    const response = yield call(request, `/vendor/${vendorId}/field`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    yield put(getFieldInfoSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(getFieldInfoError(errorObj.message));
  }
}

function* postFieldInfo({ payload }) {
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
    yield put(postFieldInfoSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(postFieldInfoError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(GET_FIELD_INFO, getFieldInfo);
  yield takeLatest(POST_FIELD_INFO, postFieldInfo);
}
