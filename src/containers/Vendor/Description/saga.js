import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { POST_DESCRIPTION } from "./constants";
import {
  postDescriptionInfoSuccess,
  postDescriptionInfoError
} from "./actions";

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
  yield takeLatest(POST_DESCRIPTION, postDescriptionInfo);
}
