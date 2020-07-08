import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { getProfileData } from "containers/LoginPage/saga";

import { POST_PROFILE_INFO } from "./constants";
import { postProfileInfoSuccess, postProfileInfoError } from "./actions";

function* postProfileInfo({ payload }) {
  try {
    const token = localStorage.getItem("token");
    yield call(request, "/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    yield call(getProfileData);
    yield put(postProfileInfoSuccess("Profile Updated successfully!"));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(postProfileInfoError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(POST_PROFILE_INFO, postProfileInfo);
}
