import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { getProfileData } from "containers/LoginPage/saga";

import { POST_PROFILE_INFO } from "./constants";
import { postProfileInfoSuccess, postProfileInfoError } from "./actions";

function* postProfileInfo({ payload }) {
  console.log(payload, "basic saga payload");
  try {
    const token = localStorage.getItem("token");
    const response = yield call(request, "/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    yield call(getProfileData);
    yield put(postProfileInfoSuccess("Profile Updated successfully!"));
  } catch (error) {
    yield put(postProfileInfoError("Profile Update Failed!"));
  }
}

export default function* mySaga() {
  yield takeLatest(POST_PROFILE_INFO, postProfileInfo);
}
