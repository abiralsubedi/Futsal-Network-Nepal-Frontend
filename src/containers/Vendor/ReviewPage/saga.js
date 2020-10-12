import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import request from "utils/request";

import {
  GET_REVIEW,
  POST_REVIEW,
  REMOVE_REVIEW,
  GET_REVIEW_DETAIL
} from "./constants";
import {
  getReviewSuccess,
  getReviewError,
  getReviewDetailSuccess,
  getReviewDetailError,
  postReviewSuccess,
  postReviewError,
  removeReviewError,
  removeReviewSuccess,
  clearReviewFetch
} from "./actions";

function* getReview({ payload }) {
  try {
    const { vendorId, query } = payload;
    const token = localStorage.getItem("token");

    const response = yield call(
      request,
      `/vendor/${vendorId}/review?${query}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (!response.length) {
      yield put(clearReviewFetch());
    }
    yield put(getReviewSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(getReviewError(errorObj.message));
  }
}

function* getReviewDetail({ payload }) {
  try {
    const { vendorId } = payload;
    const token = localStorage.getItem("token");

    const response = yield call(request, `/vendor/${vendorId}/review-detail`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    yield put(getReviewDetailSuccess(response));
    if (!response.length) {
      yield put;
    }
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(getReviewDetailError(errorObj.message));
  }
}

function* removeReview({ payload }) {
  try {
    const { vendorId, reviewId } = payload;
    const token = localStorage.getItem("token");

    yield call(request, `/vendor/${vendorId}/review`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    yield put(
      removeReviewSuccess({ message: "Review deleted successfully", reviewId })
    );
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(removeReviewError(errorObj.message));
  }
}

function* postReview({ payload }) {
  try {
    const { vendorId, reviewId } = payload;
    const token = localStorage.getItem("token");

    yield call(request, `/vendor/${vendorId}/review`, {
      method: reviewId ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const response = `Review ${
      reviewId ? "updated" : "submitted"
    } successfully.`;
    yield put(postReviewSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(postReviewError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeEvery(GET_REVIEW, getReview);
  yield takeLatest(GET_REVIEW_DETAIL, getReviewDetail);
  yield takeLatest(POST_REVIEW, postReview);
  yield takeLatest(REMOVE_REVIEW, removeReview);
}
