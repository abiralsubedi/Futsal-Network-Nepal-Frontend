import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { setFileUploadData } from "containers/LoginPage/actions";
import { uploadFile } from "containers/LoginPage/saga";

import { GET_GALLERY_INFO, POST_GALLERY_INFO } from "./constants";
import {
  getGalleryInfoSuccess,
  getGalleryInfoError,
  postGalleryInfoSuccess,
  postGalleryInfoError
} from "./actions";

function* getGalleryInfo({ payload }) {
  try {
    const { vendorId } = payload;
    const token = localStorage.getItem("token");

    const response = yield call(request, `/vendor/${vendorId}/info`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    yield put(getGalleryInfoSuccess(response.gallery));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(getGalleryInfoError(errorObj.message));
  }
}

function* postGalleryInfo({ payload }) {
  try {
    const { vendorId, gallery } = payload;
    const token = localStorage.getItem("token");
    for (const item of gallery) {
      let updatedUrl = item.photoUri;
      if (typeof updatedUrl === "object") {
        yield put(setFileUploadData(updatedUrl));
        const uploadResponse = yield call(uploadFile);
        if (uploadResponse === "failed") {
          throw new Error("Picture upload failed!");
        }
        updatedUrl = uploadResponse;
      }
      item.photoUri = updatedUrl;
    }

    yield call(request, `/vendor/${vendorId}/gallery`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const response = "Gallery updated successfully";
    yield put(postGalleryInfoSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(postGalleryInfoError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(GET_GALLERY_INFO, getGalleryInfo);
  yield takeLatest(POST_GALLERY_INFO, postGalleryInfo);
}
