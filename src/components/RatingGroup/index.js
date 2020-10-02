import React from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

import { BorderLinearProgress } from "components/Common";

import useStyles from "./style";

const RatingGroup = ({ reviewDetail }) => {
  const classes = useStyles();

  const { vendorReview, ratingList } = reviewDetail;

  const getVendorReview = () => {
    if (vendorReview) {
      return { ...vendorReview, rating: vendorReview.rating.toFixed(1) };
    }
    return { rating: 0, totalReview: 0 };
  };

  const getRatingList = () => {
    let updatedList = [];
    updatedList = [5, 4, 3, 2, 1].map(item => ({
      _id: item,
      value: 0
    }));
    (ratingList || []).forEach(rating => {
      const ratingIndex = updatedList.findIndex(
        item => item._id === rating._id
      );
      updatedList[ratingIndex] = {
        ...rating,
        value: (rating.totalNumber / vendorReviewMemo.totalReview) * 100
      };
    });
    return updatedList;
  };

  const getRatingBar = () => {
    return ratingListMemo.map(item => (
      <div className={classes.ratingBarWrapper}>
        <div>
          <Typography color="textSecondary" variant="body2">
            {item._id}
          </Typography>
        </div>
        <BorderLinearProgress
          variant="determinate"
          value={item.value}
          className={classes.ratingBar}
        />
      </div>
    ));
  };

  const vendorReviewMemo = getVendorReview();
  const ratingListMemo = getRatingList();
  const ratingBarMemo = getRatingBar();

  return (
    <Grid container spacing={3}>
      <Grid item md={3} sm={4} xs={8}>
        <div className={classes.avgReviewWrapper}>
          <Typography variant="h3" color="textSecondary">
            {vendorReviewMemo.rating}
          </Typography>
          <Rating
            name="simple-controlled"
            value={vendorReviewMemo.rating}
            precision={0.1}
            readOnly
            classes={{ iconFilled: classes.ratingColor }}
          />
          <div>
            <Typography color="textSecondary">
              {vendorReviewMemo.totalReview.toLocaleString()} total
            </Typography>
          </div>
        </div>
      </Grid>
      <Grid item md={5} sm={5} xs={8}>
        <div className={classes.multipleRatingWrapper}>{ratingBarMemo}</div>
      </Grid>
    </Grid>
  );
};

RatingGroup.propTypes = {
  reviewDetail: PropTypes.object
};

export default RatingGroup;
