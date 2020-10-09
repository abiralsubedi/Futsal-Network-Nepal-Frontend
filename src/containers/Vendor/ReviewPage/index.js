import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";

import { useSnackbar } from "notistack";
import Box from "@material-ui/core/Box";
import LazyLoad, { forceCheck } from "react-lazyload";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

import Loader from "components/Loader";
import Button from "components/Button";
import RatingGroup from "components/RatingGroup";
import CommentBox from "components/CommentBox";
import ConfirmationModal from "components/ConfirmationModal";
import AddReviewModal from "components/AddReviewModal";
import NoData from "components/NoData";

import {
  getReview,
  postReview,
  removeReview,
  clearReviewData,
  clearPostData,
  getReviewDetail
} from "./actions";
import useStyles from "./style";
import { Typography } from "@material-ui/core";

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
    removeReviewError,
    clearReviewFetch
  } = reviewData;

  const { selfReview } = reviewDetail;
  const vendorId = match.params.vendorId || profile._id;
  const isAdmin = profile.role === "Admin";
  const isUser = profile.role === "User";
  const pageSize = 7;

  const [removeReview, setRemoveReview] = useState(false);
  const [addReview, setAddReview] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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
      setAddReview(false);
      setRemoveReview(false);
      fetchReviewDetail({ vendorId });
      forceCheck();
    }
  }, [
    postReviewError,
    postReviewSuccess,
    removeReviewError,
    removeReviewSuccess
  ]);

  useEffect(() => {
    fetchReviewDetail({ vendorId });

    return () => {
      onClearReviewData();
    };
  }, []);

  useEffect(() => {
    fetchReview({ vendorId, query: getUrlParam() });
  }, [currentPage]);

  const getUrlParam = () => {
    const pageQuery = `currentPage=${currentPage}`;
    const sizeQuery = `&pageSize=${pageSize}`;

    return pageQuery + sizeQuery;
  };

  useBottomScrollListener(() => {
    if (!reviewLoading && !clearReviewFetch) {
      setCurrentPage(prev => prev + 1);
    }
  }, 300);

  const ratingGroupMemo = useMemo(() => {
    return (
      <RatingGroup reviewDetail={reviewDetail} loading={reviewDetailLoading} />
    );
  }, [reviewDetailLoading]);

  const selfReviewMemo = useMemo(() => {
    if (!selfReview) {
      return <div />;
    }
    const { _id: reviewId } = selfReview;
    return (
      <div className={classes.selfReviewWrapper}>
        {!reviewId && (
          <Button
            variant="outlined"
            buttonRootClass={classes.writeReviewButtonRoot}
            onClick={() => setAddReview({})}
          >
            Write a Review
          </Button>
        )}

        {reviewId && (
          <>
            <Typography className={classes.reviewTitle}>MY REVIEW</Typography>
            <CommentBox
              {...selfReview}
              user={{
                photoUri: profile.photoUri,
                fullName: profile.fullName,
                _id: profile._id
              }}
              handleDelete={() => setRemoveReview(selfReview)}
              handleEdit={() => setAddReview(selfReview)}
            />
          </>
        )}
      </div>
    );
  }, [reviewDetailLoading]);

  const reviewListMemo = useMemo(() => {
    if (reviewLoading && currentPage === 1) {
      return <Loader wrapperClass={classes.loadingWrapper} />;
    }
    if (!review.length) {
      return <NoData text="There is no review yet." />;
    }
    const showDelete = isAdmin;
    const reviewList = (review || []).map(item => (
      <LazyLoad height={150} key={item._id} once>
        <CommentBox
          {...item}
          handleDelete={showDelete ? () => setRemoveReview(item) : false}
        />
      </LazyLoad>
    ));
    if (reviewLoading) {
      reviewList.push(<Loader wrapperClass={classes.loadingWrapper} />);
    }
    return reviewList;
  }, [review, reviewLoading]);

  return (
    <div className={classes.reviewContent}>
      {ratingGroupMemo}

      <div>
        {isUser && !reviewDetailLoading ? selfReviewMemo : <Box mt={4} />}
        <div>
          <Typography className={classes.reviewTitle}>REVIEWS</Typography>
          {reviewListMemo}
        </div>
      </div>

      <AddReviewModal
        open={!!addReview}
        handleClose={() => setAddReview(false)}
        addReviewData={addReview}
        handleSubmit={updatedVal => saveReview({ ...updatedVal, vendorId })}
        loading={postReviewLoading}
      />
      <ConfirmationModal
        open={!!removeReview}
        handleClose={() => setRemoveReview(false)}
        title="Remove Review"
        confirmationText={
          removeReview && (
            <span>
              Are you sure you want to remove
              <strong>
                {` ${
                  removeReview.user.fullName
                    ? removeReview.user.fullName
                    : "your"
                }`}
              </strong>{" "}
              review?
            </span>
          )
        }
        handleConfirm={() => {
          onRemoveReview({ reviewId: removeReview._id, vendorId });
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
