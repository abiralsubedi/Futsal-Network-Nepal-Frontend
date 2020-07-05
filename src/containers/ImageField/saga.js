import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { POST_PROFILE_PICTURE } from "./constants";
import { postProfilePictureSuccess, postProfilePictureError } from "./actions";

function* postProfilePicture({ payload }) {
  console.log(payload, "password saga payload");
  try {
    const token = localStorage.getItem("token");
    const response = yield call(request, "/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const successMessage = `Profile Picture ${
      payload ? "Updated" : "Removed"
    } Successfully`;
    yield put(postProfilePictureSuccess(successMessage));
  } catch (error) {
    yield put(postProfilePictureError("Profile Picture Update Failed!"));
  }
}

export default function* mySaga() {
  yield takeLatest(POST_PROFILE_PICTURE, postProfilePicture);
}
