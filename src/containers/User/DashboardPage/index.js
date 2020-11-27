import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { Wrapper } from "components/Common";
import VendorCard from "components/VendorCard";
import SlickSlider from "components/SlickSlider";
import NoData from "components/NoData";

import { getRatedVendor, getNearbyVendor, clearDashboardPage } from "./actions";

import useStyles from "./style";

const DashboardPage = ({
  globalData,
  dashboardPageData,
  fetchRatedVendor,
  fetchNearbyVendor,
  history
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [locationDisabled, setLocationDisabled] = useState(false);

  useEffect(() => {
    if (!ratedVendor.length) {
      fetchRatedVendor();
    }
    if (!nearbyVendor.length) {
      getLocation();
    }
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchNearbyVendor(getLocationParams(latitude, longitude));
      },
      () => {
        setLocationDisabled(true);
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

  const getRatedFutsalCard = () => {
    if (ratedVendorLoading) {
      const loadingArray = isMobile ? [1] : [1, 2, 3];
      return loadingArray.map(item => <VendorCard loading key={item} />);
    }
    if (ratedVendor.length) {
      return ratedVendor.map(item => {
        const vendor = item.vendor;
        return (
          <VendorCard
            fullName={vendor.fullName}
            photoUri={vendor.photoUri}
            place={vendor.location.place}
            rating={item.rating}
            totalReview={item.totalReview}
            key={item._id}
            handleClick={() =>
              history.push({
                pathname: `/vendor/${item._id}/site/description`,
                state: { vendorDetail: vendor }
              })
            }
          />
        );
      });
    }
    return <NoData text="Sorry futsal are currently not available." />;
  };

  const getNearbyFutsalCard = () => {
    if (locationDisabled) {
      return <NoData text="Please allow access to location." />;
    }
    if (nearbyVendorLoading) {
      const loadingArray = isMobile ? [1] : [1, 2, 3];
      return loadingArray.map(item => <VendorCard loading key={item} />);
    }
    if (nearbyVendor.length) {
      return nearbyVendor.map(item => {
        return (
          <VendorCard
            fullName={item.fullName}
            photoUri={item.photoUri}
            place={item.location.place}
            key={item._id}
            handleClick={() =>
              history.push({
                pathname: `/vendor/${item._id}/site/description`,
                state: { vendorDetail: item }
              })
            }
          />
        );
      });
    }
    return <NoData text="Sorry there is no nearby futsal." />;
  };

  return (
    <Wrapper>
      <div className={classes.dashboardContainer}>
        <Typography variant="body1" className={classes.welcomeText}>
          Hello <strong>{fullName}</strong>, Welcome to Futsal Network Nepal
          App.
        </Typography>

        <Typography variant="h6" className={classes.sectionTitle}>
          Most Rated Futsal
        </Typography>
        <SlickSlider>{getRatedFutsalCard()}</SlickSlider>

        <Typography variant="h6" className={classes.sectionTitle}>
          Nearby Futsal
        </Typography>
        <SlickSlider>{getNearbyFutsalCard()}</SlickSlider>
      </div>
    </Wrapper>
  );
};

DashboardPage.propTypes = {
  globalData: PropTypes.object,
  dashboardPageData: PropTypes.object,
  fetchRatedVendor: PropTypes.func,
  fetchNearbyVendor: PropTypes.func,
  history: PropTypes.object
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
