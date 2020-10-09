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
  CLEAR_POST_DATA,
  CLEAR_REVIEW_FETCH
} from "./constants";

export default (
  state = {
    reviewLoading: false,
    review: [],
    reviewError: "",
    reviewDetailLoading: false,
    reviewDetail: {},
    reviewDetailError: "",
    postReviewLoading: false,
    postReviewSuccess: "",
    postReviewError: "",
    removeReviewLoading: false,
    removeReviewSuccess: "",
    removeReviewError: "",
    clearReviewFetch: false
  },
  action
) => {
  switch (action.type) {
    case GET_REVIEW:
      return {
        ...state,
        reviewLoading: true,
        reviewError: ""
      };
    case GET_REVIEW_SUCCESS:
      const newReview = state.review.concat(action.payload);
      return {
        ...state,
        reviewLoading: false,
        review: newReview
      };
    case GET_REVIEW_ERROR:
      return {
        ...state,
        reviewLoading: false,
        reviewError: action.error
      };

    case GET_REVIEW_DETAIL:
      return {
        ...state,
        reviewDetailLoading: true,
        reviewDetail: {},
        reviewDetailError: ""
      };
    case GET_REVIEW_DETAIL_SUCCESS:
      return {
        ...state,
        reviewDetailLoading: false,
        reviewDetail: action.payload
      };
    case GET_REVIEW_DETAIL_ERROR:
      return {
        ...state,
        reviewDetailLoading: false,
        reviewDetailError: action.error
      };

    case POST_REVIEW:
      return {
        ...state,
        postReviewLoading: true,
        postReviewSuccess: "",
        postReviewError: ""
      };
    case POST_REVIEW_SUCCESS:
      return {
        ...state,
        postReviewLoading: false,
        postReviewSuccess: action.payload
      };
    case POST_REVIEW_ERROR:
      return {
        ...state,
        postReviewLoading: false,
        postReviewError: action.error
      };

    case REMOVE_REVIEW:
      return {
        ...state,
        removeReviewLoading: true,
        removeReviewSuccess: "",
        removeReviewError: ""
      };
    case REMOVE_REVIEW_SUCCESS:
      const { reviewId } = action.payload;
      const updatedReview = (state.review || []).filter(
        item => item._id !== reviewId
      );
      return {
        ...state,
        review: updatedReview,
        removeReviewLoading: false,
        removeReviewSuccess: action.payload.message
      };
    case REMOVE_REVIEW_ERROR:
      return {
        ...state,
        removeReviewLoading: false,
        removeReviewError: action.error
      };

    case CLEAR_REVIEW_FETCH:
      return { ...state, clearReviewFetch: true };

    case CLEAR_REVIEW_DATA:
      return {
        ...state,
        review: [],
        reviewLoading: false,
        reviewError: "",
        clearReviewFetch: false
      };

    case CLEAR_POST_DATA:
      return {
        ...state,
        postReviewSuccess: "",
        postReviewError: "",
        removeReviewSuccess: "",
        removeReviewError: ""
      };

    default:
      return state;
  }
};
