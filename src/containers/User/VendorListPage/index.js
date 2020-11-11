import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import Typography from "@material-ui/core/Typography";

import LazyLoad from "react-lazyload";

import { Wrapper } from "components/Common";
import VendorListCard from "components/VendorListCard";
import NoData from "components/NoData";

import { clearVendorData, getVendorList } from "./actions";

import useStyles from "./style";

const DashboardPage = ({
  globalData,
  vendorListPageData,
  fetchVendorList,
  onClearVendorData
}) => {
  const classes = useStyles();

  const {
    profile: { role }
  } = globalData;
  const { vendorListLoading, vendorList } = vendorListPageData;

  const [locationDisabled, setLocationDisabled] = useState(false);

  useEffect(() => {
    fetchVendorList();
    getLocation();

    return () => {
      onClearVendorData();
    };
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        // fetchNearbyVendor(getLocationParams(latitude, longitude));
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

  const getVendorCardList = () => {
    if (vendorListLoading) {
      return [1, 2].map(item => <VendorListCard loading key={item} />);
    }
    if (vendorList.length) {
      return (vendorList || []).map(item => {
        const { vendor } = item;
        return (
          <LazyLoad height={175} key={item._id} once>
            <VendorListCard
              fullName={vendor.fullName}
              photoUri={vendor.photoUri}
              place={vendor.location.place}
              rating={item.rating}
              totalReview={item.totalReview}
              vendorDetail={vendor}
              role={role}
            />
          </LazyLoad>
        );
      });
    }
    return <NoData text="Sorry futsal are currently not available." />;
  };

  return (
    <Wrapper>
      <div className={classes.vendorListContainer}>
        {/* <Typography variant="body1" className={classes.welcomeText}>
          Hello <strong>{fullName}</strong>, Welcome to Futsal Network Nepal
          App.
        </Typography> */}
        {getVendorCardList()}
      </div>
    </Wrapper>
  );
};

DashboardPage.propTypes = {
  globalData: PropTypes.object,
  vendorListPageData: PropTypes.object,
  fetchVendorList: PropTypes.func,
  onClearVendorData: PropTypes.func
};

const mapStateToProps = state => ({
  globalData: state.LoginReducer,
  vendorListPageData: state.VendorListPageReducer
});

const mapDispatchToProps = dispatch => ({
  fetchVendorList: data => dispatch(getVendorList(data)),
  onClearVendorData: () => dispatch(clearVendorData())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DashboardPage);
