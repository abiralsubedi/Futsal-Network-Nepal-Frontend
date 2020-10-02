import { call, put, takeLatest } from "redux-saga/effects";
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
  removeReviewSuccess
} from "./actions";

function* getReview({ payload }) {
  try {
    const { vendorId } = payload;
    const token = localStorage.getItem("token");

    yield call(request, `/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const response = [];
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

    yield call(request, `/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const response = {
      selfReview: {},
      vendorReview: {
        rating: 3.4,
        totalReview: 20
      },
      ratingList: [
        { _id: 5, totalNumber: 3 },
        { _id: 4, totalNumber: 12 },
        { _id: 1, totalNumber: 5 }
      ]
    };
    yield put(getReviewDetailSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(getReviewDetailError(errorObj.message));
  }
}

function* removeReview({ payload }) {
  try {
    const { vendorId } = payload;
    const token = localStorage.getItem("token");

    yield call(request, `/vendor/${vendorId}/working-hour`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    yield put(removeReviewSuccess("Game hour deleted successfully"));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(removeReviewError(errorObj.message));
  }
}

function* postReview({ payload }) {
  try {
    const { vendorId, ReviewId } = payload;
    const token = localStorage.getItem("token");

    yield call(request, `/vendor/${vendorId}/working-hour`, {
      method: ReviewId ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const response = `Game hour ${
      ReviewId ? "updated" : "created"
    } successfully.`;
    yield put(postReviewSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(postReviewError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(GET_REVIEW, getReview);
  yield takeLatest(GET_REVIEW_DETAIL, getReviewDetail);
  yield takeLatest(POST_REVIEW, postReview);
  yield takeLatest(REMOVE_REVIEW, removeReview);
}
