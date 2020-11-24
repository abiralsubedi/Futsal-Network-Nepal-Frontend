import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { Wrapper } from "components/Common";
import DashboardInfoCard from "components/DashboardInfoCard";

import {
  getDashboardInfo,
  getCurrentBooking,
  clearDashboardPage
} from "./actions";

import useStyles from "./style";

const DashboardPage = ({
  globalData,
  dashboardPageData,
  fetchDashboardInfo,
  fetchCurrentBooking,
  onClearDashboardPage
}) => {
  const classes = useStyles();

  const {
    profile: { fullName }
  } = globalData;
  const {
    dashboardInfoLoading,
    dashboardInfo,
    currentBookingLoading,
    currentBooking
  } = dashboardPageData;

  useEffect(() => {
    fetchDashboardInfo();
    fetchCurrentBooking();

    return () => {
      onClearDashboardPage();
    };
  }, []);

  const getCardDetail = () => {
    return [
      {
        title: "Total User",
        count: dashboardInfo.userCount,
        iconType: "user"
      },
      {
        title: "Total Futsal",
        count: dashboardInfo.vendorCount,
        iconType: "futsal"
      },
      {
        title: "Total Booking",
        count: dashboardInfo.booking.count,
        iconType: "booking"
      },
      {
        title: "Total Amount",
        count: dashboardInfo.booking.amount,
        iconType: "payment"
      }
    ];
  };

  const getDashboardCard = () => {
    if (dashboardInfoLoading) {
      return [1, 2, 3, 4].map(item => (
        <Grid item md={3} sm={6} xs={12} key={item}>
          <DashboardInfoCard loading />
        </Grid>
      ));
    }

    if (dashboardInfo) {
      const cardDetails = getCardDetail();

      return (cardDetails || []).map((item, index) => (
        <Grid item md={3} sm={6} xs={12} key={item.title}>
          <DashboardInfoCard {...item} cardIndex={index} />
        </Grid>
      ));
    }
    return "";
  };

  return (
    <Wrapper>
      <div className={classes.dashboardContainer}>
        <Typography variant="body1" className={classes.welcomeText}>
          Hello <strong>{fullName}</strong>, Welcome to Futsal Network Nepal
          App.
        </Typography>

        <Grid container spacing={3}>
          {getDashboardCard()}
        </Grid>

        <Typography variant="h6" className={classes.sectionTitle}>
          Today's Statistic
        </Typography>
      </div>
    </Wrapper>
  );
};

DashboardPage.propTypes = {
  globalData: PropTypes.object,
  dashboardPageData: PropTypes.object,
  fetchDashboardInfo: PropTypes.func,
  fetchCurrentBooking: PropTypes.func,
  onClearDashboardPage: PropTypes.func
};

const mapStateToProps = state => ({
  globalData: state.LoginReducer,
  dashboardPageData: state.AdminDashboardPageReducer
});

const mapDispatchToProps = dispatch => ({
  fetchDashboardInfo: data => dispatch(getDashboardInfo(data)),
  fetchCurrentBooking: data => dispatch(getCurrentBooking(data)),
  onClearDashboardPage: () => dispatch(clearDashboardPage())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DashboardPage);
