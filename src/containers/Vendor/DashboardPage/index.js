import React, { useState, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import { Wrapper } from "components/Common";
import DashboardInfoCard from "components/DashboardInfoCard";
import PeopleTable from "components/PeopleTable";
import BookingDetailModal from "components/BookingDetailModal";

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
    profile: { fullName, role }
  } = globalData;
  const {
    dashboardInfoLoading,
    dashboardInfo,
    currentBookingLoading,
    currentBooking
  } = dashboardPageData;

  const [viewBookingInfo, setViewBookingInfo] = useState(false);

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
        title: "Booking (Today)",
        count: dashboardInfo.todayBooking,
        iconType: "futsal"
      },
      {
        title: "Available Booking (Today)",
        count: dashboardInfo.availableBooking,
        iconType: "futsal"
      },
      {
        title: "Total Fields",
        count: dashboardInfo.fieldCount,
        iconType: "booking"
      },
      {
        title: "Total Booking",
        count: dashboardInfo.totalBooking,
        iconType: "booking"
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

  const tableHeader = [
    { label: "User", key: "user.fullName" },
    { label: "Time", key: "workingHour.clock.fullName" },
    { label: "Field Name", key: "field.name" },
    { label: "Price ($)", key: "workingHour.price", align: "right" }
  ];

  const actions = [
    {
      type: "View",
      handleClick: item => setViewBookingInfo(item)
    }
  ];

  const bookingTableMemo = useMemo(() => {
    return (
      <PeopleTable
        noDataText="Sorry, There has been no booking for today."
        tableHeader={tableHeader}
        tableBody={currentBooking}
        tableBodyLoading={currentBookingLoading}
        actions={actions}
        noMultiSelect
      />
    );
  }, [currentBookingLoading]);

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
          Today's Booking
        </Typography>
        <Card variant="outlined">{bookingTableMemo}</Card>
        <BookingDetailModal
          open={!!viewBookingInfo}
          handleClose={() => setViewBookingInfo(false)}
          bookingDetail={viewBookingInfo}
          role={role}
        />
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
  dashboardPageData: state.VendorDashboardPageReducer
});

const mapDispatchToProps = dispatch => ({
  fetchDashboardInfo: data => dispatch(getDashboardInfo(data)),
  fetchCurrentBooking: data => dispatch(getCurrentBooking(data)),
  onClearDashboardPage: () => dispatch(clearDashboardPage())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DashboardPage);
