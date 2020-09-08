import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { uploadFile } from "containers/LoginPage/saga";

import { setFileUploadData } from "containers/LoginPage/actions";

import { POST_PROFILE_INFO, GET_PROFILE_INFO } from "./constants";
import {
  postProfileInfoSuccess,
  postProfileInfoError,
  getProfileInfoSuccess,
  getProfileInfoError,
  updateUserPhoto
} from "./actions";

function* getUserProfileInfo({ payload }) {
  try {
    const { userId } = payload;
    const token = localStorage.getItem("token");

    const response = yield call(request, `/people/vendor/${userId}`, {
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

function* postProfileInfo({ payload }) {
  try {
    const token = localStorage.getItem("token");
    const { userPhoto, userId } = payload;

    let photoUri = userPhoto;

    if (typeof userPhoto === "object") {
      yield put(setFileUploadData(userPhoto));
      const uploadResponse = yield call(uploadFile);
      if (uploadResponse === "failed") {
        throw new Error("Profile picture upload failed!");
      }
      photoUri = uploadResponse;
    }
    yield put(updateUserPhoto(photoUri));

    let updatedAPI;
    if (userId) {
      updatedAPI = `/people/vendor/${userId}`;
    } else {
      updatedAPI = `/people/vendor`;
    }

    const response = yield call(request, updatedAPI, {
      method: userId ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...payload, photoUri })
    });
    yield put(postProfileInfoSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(postProfileInfoError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(POST_PROFILE_INFO, postProfileInfo);
  yield takeLatest(GET_PROFILE_INFO, getUserProfileInfo);
}
