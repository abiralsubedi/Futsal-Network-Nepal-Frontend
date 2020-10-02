import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";

import { useSnackbar } from "notistack";

import Loader from "components/Loader";
import RatingGroup from "components/RatingGroup";
import CommentBox from "components/CommentBox";
import ConfirmationModal from "components/ConfirmationModal";

import {
  getReview,
  postReview,
  removeReview,
  clearReviewData,
  clearPostData,
  getReviewDetail
} from "./actions";
import useStyles from "./style";

const ReviewPage = ({
  onClearReviewData,
  fetchReview,
  reviewData,
  globalData: { profile },
  match,
  saveReview,
  onClearPostData,
  fetchReviewDetail,
  onRemoveReview
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const {
    reviewLoading,
    review,
    reviewDetailLoading,
    reviewDetail,
    postReviewError,
    postReviewSuccess,
    postReviewLoading,
    removeReviewLoading,
    removeReviewSuccess,
    removeReviewError
  } = reviewData;

  const vendorId = match.params.vendorId || profile._id;
  const isAdmin = profile.role !== "Admin";

  const [removeReview, setRemoveReview] = useState(false);

  useEffect(() => {
    fetchReview({ vendorId });
    fetchReviewDetail({ vendorId });
  }, []);

  useEffect(() => {
    if (postReviewError || removeReviewError) {
      enqueueSnackbar(postReviewError || removeReviewError, {
        variant: "error",
        onClose: () => onClearPostData()
      });
    }
    if (postReviewSuccess || removeReviewSuccess) {
      enqueueSnackbar(postReviewSuccess || removeReviewSuccess, {
        variant: "success",
        onClose: () => onClearPostData()
      });
    }
  }, [
    postReviewError,
    postReviewSuccess,
    removeReviewError,
    removeReviewSuccess
  ]);

  const ratingGroupMemo = useMemo(
    () => <RatingGroup reviewDetail={reviewDetail} />,
    [reviewDetailLoading]
  );

  const reviewListMemo = useMemo(() => {
    return (review || []).map(item => (
      <CommentBox
        {...item}
        handleDelete={isAdmin ? () => setRemoveReview(item) : false}
        key={item._id}
      />
    ));
  }, [reviewLoading]);

  if (reviewLoading || reviewDetailLoading) {
    return <Loader wrapperClass={classes.loadingWrapper} />;
  }

  return (
    <div className={classes.ReviewContent}>
      {ratingGroupMemo}
      {reviewListMemo}
      <ConfirmationModal
        open={!!removeReview}
        handleClose={() => setRemoveReview(false)}
        title="Remove Review"
        confirmationText={
          removeReview && (
            <span>
              Are you sure you want to remove
              <strong>
                {` ${removeReview.user.fullName}'s` || "your"}
              </strong>{" "}
              review?
            </span>
          )
        }
        handleConfirm={() => {
          console.log("hello");
        }}
        transitionDuration={{ exit: 0 }}
        loading={removeReviewLoading}
      />
    </div>
  );
};

ReviewPage.propTypes = {
  fetchReview: PropTypes.func,
  onClearReviewData: PropTypes.func,
  reviewData: PropTypes.object,
  globalData: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  saveReview: PropTypes.func,
  onClearPostData: PropTypes.func,
  onRemoveReview: PropTypes.func,
  fetchReviewDetail: PropTypes.func
};

const mapStateToProps = state => ({
  reviewData: state.ReviewPageReducer,
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({
  fetchReview: data => dispatch(getReview(data)),
  fetchReviewDetail: data => dispatch(getReviewDetail(data)),
  onClearReviewData: () => dispatch(clearReviewData()),
  onClearPostData: () => dispatch(clearPostData()),
  saveReview: data => dispatch(postReview(data)),
  onRemoveReview: data => dispatch(removeReview(data))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(ReviewPage);
