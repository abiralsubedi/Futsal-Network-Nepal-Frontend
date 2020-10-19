import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { uploadFile } from "containers/LoginPage/saga";
import {
  setFileUploadData,
  updateProfilePicture
} from "containers/LoginPage/actions";

import { POST_PROFILE_PICTURE } from "./constants";
import { postProfilePictureSuccess, postProfilePictureError } from "./actions";

function* postProfilePicture({ payload }) {
  try {
    let updatedUri = "";
    if (payload) {
      yield put(setFileUploadData(payload));
      const uploadResponse = yield call(uploadFile);
      if (uploadResponse === "failed") {
        throw new Error("Profile picture update failed!");
      }
      updatedUri = uploadResponse;
    }
    const token = localStorage.getItem("token");
    yield call(request, "/profile/picture", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ updatedUri })
    });
    yield put(updateProfilePicture(updatedUri));
    const successMessage = `Profile picture ${
      payload ? "updated" : "removed"
    } successfully`;
    yield put(postProfilePictureSuccess(successMessage));
  } catch (error) {
    let errorObj = error;
    if (error.response) {
      errorObj = yield error.response.json();
    }
    yield put(postProfilePictureError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(POST_PROFILE_PICTURE, postProfilePicture);
}
