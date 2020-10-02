import {
  GET_REVIEW,
  GET_REVIEW_ERROR,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_DETAIL,
  GET_REVIEW_DETAIL_ERROR,
  GET_REVIEW_DETAIL_SUCCESS,
  POST_REVIEW,
  POST_REVIEW_ERROR,
  POST_REVIEW_SUCCESS,
  REMOVE_REVIEW,
  REMOVE_REVIEW_ERROR,
  REMOVE_REVIEW_SUCCESS,
  CLEAR_REVIEW_DATA,
  CLEAR_POST_DATA
} from "./constants";

export const getReview = payload => ({
  type: GET_REVIEW,
  payload
});

export const getReviewSuccess = payload => ({
  type: GET_REVIEW_SUCCESS,
  payload
});
export const getReviewError = error => ({
  type: GET_REVIEW_ERROR,
  error
});

export const getReviewDetail = payload => ({
  type: GET_REVIEW_DETAIL,
  payload
});

export const getReviewDetailSuccess = payload => ({
  type: GET_REVIEW_DETAIL_SUCCESS,
  payload
});
export const getReviewDetailError = error => ({
  type: GET_REVIEW_DETAIL_ERROR,
  error
});

export const postReview = payload => ({
  type: POST_REVIEW,
  payload
});

export const postReviewSuccess = payload => ({
  type: POST_REVIEW_SUCCESS,
  payload
});
export const postReviewError = error => ({
  type: POST_REVIEW_ERROR,
  error
});

export const removeReview = payload => ({
  type: REMOVE_REVIEW,
  payload
});

export const removeReviewSuccess = payload => ({
  type: REMOVE_REVIEW_SUCCESS,
  payload
});
export const removeReviewError = error => ({
  type: REMOVE_REVIEW_ERROR,
  error
});

export const clearReviewData = () => ({
  type: CLEAR_REVIEW_DATA
});

export const clearPostData = () => ({
  type: CLEAR_POST_DATA
});
