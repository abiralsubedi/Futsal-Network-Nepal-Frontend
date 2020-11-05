import React from "react";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";

import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";

import getImageUrl from "utils/getImageUrl";

import useStyles from "./style";

const VendorCard = ({ fullName, place, rating, totalReview }) => {
  const classes = useStyles();
  return (
    <Card className={classes.vendorCardRoot}>
      <img
        src={getImageUrl("/images/toh-1601039140949.jpg")}
        className={classes.roundedImage}
        alt="vendor-logo"
      />
      <div className={classes.cardContent}>
        <Typography className={classes.vendorInfoText}>{fullName}</Typography>
        <Typography className={classes.vendorInfoText} color="textSecondary">
          <span className={classes.vendorAddress}>
            <RoomOutlinedIcon fontSize="small" />
            <span className={classes.vendorInfoText}>{place}</span>
          </span>
        </Typography>
        <div className={classes.vendorCardRating}>
          <Rating
            name="simple-controlled"
            value={rating}
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
      </div>
    </Card>
  );
};

VendorCard.propTypes = {
  fullName: PropTypes.string,
  place: PropTypes.string,
  rating: PropTypes.number,
  totalReview: PropTypes.number
};

export default VendorCard;
