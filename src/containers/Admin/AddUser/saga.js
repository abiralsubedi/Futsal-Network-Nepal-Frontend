import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { getProfileData } from "containers/LoginPage/saga";

import { POST_PROFILE_INFO, GET_PROFILE_INFO } from "./constants";
import {
  postProfileInfoSuccess,
  postProfileInfoError,
  getProfileInfoSuccess,
  getProfileInfoError
} from "./actions";

function* postProfileInfo({ payload }) {
  try {
    const token = localStorage.getItem("token");

    // yield call(request, "/profile", {
    //   method: "PUT",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(payload)
    // });
    yield call(getProfileData);
    yield put(postProfileInfoSuccess("Profile Updated successfully!"));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(postProfileInfoError(errorObj.message));
  }
}

function* getUserProfileInfo({ payload }) {
  try {
    const { userId } = payload;
    const token = localStorage.getItem("token");

    const response = yield call(request, `/people/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    yield put(getProfileInfoSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(getProfileInfoError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(POST_PROFILE_INFO, postProfileInfo);
  yield takeLatest(GET_PROFILE_INFO, getUserProfileInfo);
}
