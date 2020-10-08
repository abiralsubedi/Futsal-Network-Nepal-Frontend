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

    const response = yield call(request, `/vendor/${vendorId}/review`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const response1 = [
      {
        _id: 123,
        user: {
          photoUri: "/images/toh-1601039140949.jpg",
          fullName: "Bishal Rana"
        },
        reviewDate: new Date("2020-10-02T10:13:55.945Z"),
        rating: 4,
        comment:
          "Nice! Really fun game, never gets old. It's pretty popular, and I completely see why. It's a great time killer and I adore the looks of everything in it. I would think that it would be extremely laggy on - my device in general, which is an android - but.. I was clearly wrong! I find it cool that it's free, but a few quick requests, is it possible to make the PC version of Among us free? And, it would be even more awesome if you could add the Friends option, so you can add others and join them"
      },
      {
        _id: 456,
        user: {
          photoUri: "",
          fullName: "Poonam Rai"
        },
        reviewDate: new Date("2020-06-06T10:13:55.945Z"),
        rating: 5,
        comment:
          "Nice! Really fun game, never gets old. It's pretty popular, and I completely see why. It's a great time killer and I adore the looks of everything in it. I would think that it would be extremely laggy on - my device in general, which is an android."
      }
    ];
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
    const response1 = {
      selfReview: {
        _id: 123,
        reviewDate: new Date("2020-10-02T10:13:55.945Z"),
        rating: 4,
        comment:
          "Nice! Really fun game, never gets old. It's pretty popular, and I completely see why. It's a great time killer and I adore the looks of everything in it. I would think that it would be extremely laggy on - my device in general, which is an android - but.. I was clearly wrong! I find it cool that it's free, but a few quick requests, is it possible to make the PC version of Among us free? And, it would be even more awesome if you could add the Friends option, so you can add others and join them"
      },
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
      removeReviewSuccess({ message: "Review Deleted successfully", reviewId })
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
  yield takeLatest(GET_REVIEW, getReview);
  yield takeLatest(GET_REVIEW_DETAIL, getReviewDetail);
  yield takeLatest(POST_REVIEW, postReview);
  yield takeLatest(REMOVE_REVIEW, removeReview);
}
