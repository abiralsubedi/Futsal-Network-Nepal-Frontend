import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import Typography from "@material-ui/core/Typography";

import { Wrapper } from "components/Common";
import VendorCard from "components/VendorCard";

import { getRatedVendor, getNearbyVendor } from "./actions";

import useStyles from "./style";

const DashboardPage = ({
  globalData,
  dashboardPageData,
  fetchRatedVendor,
  fetchNearbyVendor
}) => {
  const classes = useStyles();

  const {
    profile: { fullName }
  } = globalData;
  const {
    ratedVendorLoading,
    ratedVendor,
    nearbyVendorLoading,
    nearbyVendor
  } = dashboardPageData;

  useEffect(() => {
    fetchRatedVendor();
    getDirection();
  }, []);

  const getDirection = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchNearbyVendor(getLocationParams(latitude, longitude));
      },
      () => {
        console.error("error");
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  const getLocationParams = (lat, lng) => {
    const latitude = `lat=${lat}`;
    const longitude = `&lng=${lng}`;
    const radius = `&radius=6`;
    return latitude + longitude + radius;
  };

  return (
    <Wrapper>
      <div className={classes.dashboardContainer}>
        <Typography variant="body1" className={classes.welcomeText}>
          (From user) Hello <strong>{fullName}</strong>, Welcome to Futsal
          Network Nepal App.
        </Typography>
        <VendorCard
          fullName="Baneswor Futsal and Recreation CenterBaneswor Futsal and Recreation
          CenterBaneswor Futsal and Recreation Center"
          place="Baneswor, KathmanduBaneswor, KathmanduBaneswor, KathmanduBaneswor,
          KathmanduBaneswor, Kathmandu"
          rating={3.6}
          totalReview={1056}
        />
      </div>
    </Wrapper>
  );
};

DashboardPage.propTypes = {
  globalData: PropTypes.object,
  dashboardPageData: PropTypes.object,
  fetchRatedVendor: PropTypes.func,
  fetchNearbyVendor: PropTypes.func
};

const mapStateToProps = state => ({
  globalData: state.LoginReducer,
  dashboardPageData: state.UserDashboardPageReducer
});

const mapDispatchToProps = dispatch => ({
  fetchRatedVendor: data => dispatch(getRatedVendor(data)),
  fetchNearbyVendor: data => dispatch(getNearbyVendor(data))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DashboardPage);
