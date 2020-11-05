import React from "react";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Skeleton from "@material-ui/lab/Skeleton";

import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";

import getImageUrl from "utils/getImageUrl";

import useStyles from "./style";

const VendorCard = ({
  fullName,
  place,
  rating,
  totalReview,
  loading,
  handleClick,
  photoUri
}) => {
  const classes = useStyles();

  if (loading) {
    return (
      <Card className={classes.vendorCardRoot} variant="outlined">
        <Skeleton
          variant="rect"
          height={160}
          animation="wave"
          classes={{ root: classes.skeletonRoot }}
        />
        <div className={classes.loadingCardContent}>
          <Skeleton
            animation="wave"
            height={12}
            width="70%"
            style={{ marginBottom: 6 }}
          />
          <Skeleton animation="wave" height={12} width="80%" />
        </div>
      </Card>
    );
  }
  return (
    <Card
      className={classes.vendorCardRoot}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
      variant="outlined"
    >
      <div className={classes.imageContainer}>
        <img
          src={getImageUrl(photoUri)}
          className={classes.roundedImage}
          alt="vendor-logo"
        />
      </div>
      <div className={classes.cardContent}>
        <div>
          <Typography className={classes.vendorInfoText}>{fullName}</Typography>
          <Typography color="textSecondary" variant="body2">
            <span className={classes.vendorAddress}>
              <RoomOutlinedIcon fontSize="small" />
              <span className={classes.vendorInfoText}>{place}</span>
            </span>
          </Typography>
        </div>
        {rating && (
          <div className={classes.vendorCardRating}>
            <Rating
              name="simple-controlled"
              value={+rating.toFixed(2)}
              precision={0.1}
              readOnly
              classes={{ iconFilled: classes.ratingColor }}
              size="small"
            />
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.ratingCount}
            >
              ({totalReview.toLocaleString()})
            </Typography>
          </div>
        )}
      </div>
    </Card>
  );
};

VendorCard.propTypes = {
  fullName: PropTypes.string,
  photoUri: PropTypes.string,
  place: PropTypes.string,
  rating: PropTypes.number,
  totalReview: PropTypes.number,
  handleClick: PropTypes.func,
  loading: PropTypes.bool
};

export default VendorCard;
