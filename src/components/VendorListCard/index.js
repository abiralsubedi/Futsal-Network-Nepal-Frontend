import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";

import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";

import Button from "components/Button";

import getImageUrl from "utils/getImageUrl";

import useStyles from "./style";

const VendorListCard = ({
  fullName,
  place,
  rating,
  totalReview,
  loading,
  photoUri,
  vendorDetail,
  history,
  role
}) => {
  const classes = useStyles();
  const isUser = role === "User";
  const isAdmin = role === "Admin";

  if (loading) {
    return (
      <Card className={classes.vendorCardRoot} variant="outlined">
        <Grid container spacing={0}>
          <Grid item sm={4} xs={12}>
            <Skeleton variant="rect" height={160} animation="wave" />
          </Grid>
          <Grid item sm={8} xs={12}>
            <div className={classes.loadingCardContent}>
              <div>
                <Skeleton
                  animation="wave"
                  height={12}
                  width="70%"
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height={12} width="80%" />
              </div>
              <div className={classes.loadingButtonGroup}>
                {[1, 2].map(item => (
                  <Box mr={3} key={item}>
                    <Skeleton
                      variant="rect"
                      height={35}
                      width={100}
                      animation="wave"
                    />
                  </Box>
                ))}
              </div>
              <div />
            </div>
          </Grid>
        </Grid>
      </Card>
    );
  }

  const getCardButton = type => {
    let buttonText = "Visit Site";
    let url = "/site/description";
    if (type === "Book") {
      buttonText = "Book Now";
      url = "/site/booking";
    } else if (type === "Schedule") {
      buttonText = "Visit Schedule";
      url = "/schedule/game-hour";
    }

    return (
      <Button
        variant="outlined"
        color="primary"
        buttonRootClass={classes.vendorListCardButton}
        buttonText={buttonText}
        onClick={e => {
          e.stopPropagation();
          history.push({
            pathname: `/vendor/${vendorDetail._id}${url}`,
            state: { vendorDetail: vendorDetail }
          });
        }}
      />
    );
  };

  return (
    <Card
      className={classes.vendorCardRoot}
      onClick={() =>
        history.push({
          pathname: `/vendor/${vendorDetail._id}/site/description`,
          state: { vendorDetail: vendorDetail }
        })
      }
      style={{ cursor: "pointer" }}
      variant="outlined"
    >
      <Grid container spacing={0}>
        <Grid item sm={4} xs={12}>
          <div className={classes.imageContainer}>
            <img
              src={getImageUrl(photoUri)}
              className={classes.roundedImage}
              alt="vendor-logo"
            />
          </div>
        </Grid>
        <Grid item sm={8} xs={12}>
          <div className={classes.cardContent}>
            <div>
              <Typography className={classes.vendorInfoText}>
                {fullName}
              </Typography>
              <Typography className={classes.secondaryText} variant="body2">
                <span className={classes.vendorAddress}>
                  <RoomOutlinedIcon fontSize="small" />
                  <span className={classes.vendorInfoText}>{place}</span>
                </span>
              </Typography>
            </div>
            <div className={classes.vendorCardRating}>
              <Rating
                name="simple-controlled"
                value={+rating.toFixed(2)}
                precision={0.1}
                readOnly
                classes={{ iconFilled: classes.ratingColor }}
                size="small"
              />
              <Typography variant="body2" className={classes.ratingCount}>
                ({totalReview.toLocaleString()})
              </Typography>
            </div>
            <Grid container spacing={3}>
              <Grid item>{getCardButton("Visit")}</Grid>
              {isUser && <Grid item>{getCardButton("Book")}</Grid>}
              {isAdmin && <Grid item>{getCardButton("Schedule")}</Grid>}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

VendorListCard.propTypes = {
  fullName: PropTypes.string,
  photoUri: PropTypes.string,
  place: PropTypes.string,
  rating: PropTypes.number,
  totalReview: PropTypes.number,
  handleClick: PropTypes.func,
  loading: PropTypes.bool,
  vendorDetail: PropTypes.object,
  history: PropTypes.object,
  role: PropTypes.string
};

export default withRouter(VendorListCard);
