import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import Grid from "@material-ui/core/Grid";

import LazyLoad from "react-lazyload";

import { Wrapper } from "components/Common";
import VendorListCard from "components/VendorListCard";
import NoData from "components/NoData";
import VendorListFilter from "components/VendorListFilter";

import { getVendorList, setFilterOptions } from "./actions";

import useStyles from "./style";

const VendorListPage = ({
  globalData,
  vendorListPageData,
  fetchVendorList,
  onSetFilterOptions
}) => {
  const classes = useStyles();

  const {
    profile: { role }
  } = globalData;
  const { vendorListLoading, vendorList, filterOptions } = vendorListPageData;

  const [currentLocation, setCurrentLocation] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      () => {
        setCurrentLocation(false);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  const searchVendorList = ({ vendorName, radius, ratingRange }) => {
    const [minRate, maxRate] = ratingRange;
    fetchVendorList({
      query: getUrlParam(vendorName, radius, minRate, maxRate)
    });
  };

  const getUrlParam = (vendorName, radius, minRate, maxRate) => {
    const queryArray = [];
    queryArray.push(
      `vendorName=${vendorName}`,
      `radius=${radius}`,
      `minRate=${minRate}`,
      `maxRate=${maxRate}`,
      `lat=${currentLocation.lat}`,
      `lng=${currentLocation.lng}`
    );
    return queryArray.join("&");
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
    return <NoData text="Sorry there are no matching futsal." />;
  };

  return (
    <Wrapper>
      <div className={classes.vendorListContainer}>
        <Grid container spacing={1}>
          <Grid item md={4} xs={12}>
            <VendorListFilter
              location={currentLocation}
              loading={vendorListLoading}
              handleSearch={data => {
                searchVendorList(data);
                onSetFilterOptions(data);
              }}
              initialFilterOptions={filterOptions}
            />
          </Grid>
          <Grid item md={8} xs={12}>
            {getVendorCardList()}
          </Grid>
        </Grid>
      </div>
    </Wrapper>
  );
};

VendorListPage.propTypes = {
  globalData: PropTypes.object,
  vendorListPageData: PropTypes.object,
  fetchVendorList: PropTypes.func,
  onSetFilterOptions: PropTypes.func
};

const mapStateToProps = state => ({
  globalData: state.LoginReducer,
  vendorListPageData: state.VendorListPageReducer
});

const mapDispatchToProps = dispatch => ({
  fetchVendorList: data => dispatch(getVendorList(data)),
  onSetFilterOptions: data => dispatch(setFilterOptions(data))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(VendorListPage);
