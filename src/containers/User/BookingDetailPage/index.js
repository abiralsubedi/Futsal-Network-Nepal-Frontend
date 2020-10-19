import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { useSnackbar } from "notistack";

import Typography from "@material-ui/core/Typography";

import PeopleTable from "components/PeopleTable";
import TableDateFilter from "components/TableDateFilter";
import ConfirmationModal from "components/ConfirmationModal";

import getDateTime from "utils/getDateTime";
import getFirstHourDate from "utils/getFirstHourDate";

import { getBookingDetail, removeBooking, clearPostData } from "./actions";
import useStyles from "./style";

const FieldsPage = ({
  fetchBookingData,
  onRemoveBooking,
  onClearPostData,
  globalData: { profile },
  bookingDetailData,
  match
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const {
    getBookingDetailLoading,
    bookingDetail: { searchCount, items: bookingDetailItems },
    removeBookingLoading,
    removeBookingSuccess,
    removeBookingError
  } = bookingDetailData;

  const pageSize = 8;
  const isVendor = profile.role === "Vendor";
  const vendorId = match.params.vendorId || isVendor ? profile._id : "";

  const [currentPage, setCurrentPage] = useState(1);
  const [deleteBookingData, setDeleteBookingData] = useState(false);
  const [viewBookingInfo, setViewBookingInfo] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 7))
  );

  useEffect(() => {
    if (removeBookingError) {
      enqueueSnackbar(removeBookingError, {
        variant: "error",
        onClose: () => onClearPostData()
      });
    }
    if (removeBookingSuccess) {
      enqueueSnackbar(removeBookingSuccess, {
        variant: "success",
        onClose: () => onClearPostData()
      });
      handleBookingSearch({});
      setDeleteBookingData(false);
    }
  }, [removeBookingError, removeBookingSuccess]);

  useEffect(() => {
    handleBookingSearch({});
  }, []);

  const handleBookingSearch = ({ pageNum }) => {
    const updatedPage = pageNum || currentPage;
    setCurrentPage(updatedPage);

    fetchBookingData({ query: getUrlParam(updatedPage), vendorId });
  };

  const getUrlParam = pageNum => {
    const startDateQuery = `startDate=${getFirstHourDate(startDate)}`;
    const endDateQuery = `&endDate=${getFirstHourDate(endDate, 1)}`;
    const pageQuery = `&currentPage=${pageNum}`;
    const sizeQuery = `&pageSize=${pageSize}`;

    return startDateQuery + endDateQuery + pageQuery + sizeQuery;
  };

  const handlePaginationChange = (event, page) => {
    handleBookingSearch({ pageNum: page });
  };

  const tableHeader = [
    { label: "Futsal", key: "vendor.fullName" },
    { label: "Booking Date", key: "bookingDate", type: "Date" },
    { label: "Time", key: "workingHour.clock.fullName" },
    { label: "Status", key: "inactive", type: "Bool", status: "status" }
  ];

  const actions = [
    {
      type: "Cancel",
      handleClick: item => setDeleteBookingData(item),
      check: "inactive"
    },
    {
      type: "View",
      handleClick: item => setViewBookingInfo(item)
    }
  ];

  const bookingDetailTableMemo = useMemo(() => {
    const paginationSize = Math.ceil(searchCount / pageSize);
    const updatedBookingDetail = (bookingDetailItems || []).map(item => {
      const bookingTime = new Date(
        new Date(item.bookingDate).setHours(
          item.workingHour.clock.clockNo,
          0,
          0
        )
      );
      const isPassed = Date.parse(new Date()) > Date.parse(bookingTime);
      let status = "Active";
      if (item.cancelled) {
        status = "Cancelled";
      } else if (isPassed) {
        status = "Completed";
      }

      return { ...item, status, inactive: status !== "Active" };
    });
    return (
      <PeopleTable
        type="booking"
        tableHeader={tableHeader}
        tableBody={updatedBookingDetail || []}
        tableBodyLoading={getBookingDetailLoading}
        paginationSize={paginationSize}
        currentPage={currentPage}
        handlePaginationChange={handlePaginationChange}
        actions={actions}
        noMultiSelect
      />
    );
  }, [getBookingDetailLoading]);

  const getConfirmationText = () => {
    if (!deleteBookingData) {
      return "";
    }
    return (
      <Typography>
        You are about to cancel game in {deleteBookingData.vendor.fullName} at{" "}
        {deleteBookingData.workingHour.clock.fullName} on{" "}
        {getDateTime(deleteBookingData.bookingDate, "onlyDate")}.
        <br />
        You will be refunded ${deleteBookingData.workingHour.price} as futsal
        credit.
      </Typography>
    );
  };

  return (
    <div className={classes.GameHourContent}>
      <TableDateFilter
        contentLoading={getBookingDetailLoading}
        dateField={[
          {
            label: "Start Date",
            value: startDate,
            handleChange: data => setStartDate(data),
            maxDate: new Date(endDate)
          },
          {
            label: "End Date",
            value: endDate,
            handleChange: data => setEndDate(data),
            minDate: new Date(startDate)
          }
        ]}
        handleSearch={() => handleBookingSearch({ pageNum: 1 })}
      />
      {bookingDetailTableMemo}
      <ConfirmationModal
        open={!!deleteBookingData}
        handleClose={() => setDeleteBookingData(false)}
        title="Cancel Booking"
        confirmationBody={getConfirmationText()}
        handleConfirm={() =>
          onRemoveBooking({ bookingId: deleteBookingData._id })
        }
        transitionDuration={{ exit: 0 }}
        loading={removeBookingLoading}
      />
    </div>
  );
};

FieldsPage.propTypes = {
  fetchBookingData: PropTypes.func,
  onClearPostData: PropTypes.func,
  onRemoveBooking: PropTypes.func,
  bookingDetailData: PropTypes.object,
  match: PropTypes.object
};

const mapStateToProps = state => ({
  bookingDetailData: state.BookingDetailPageReducer,
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({
  fetchBookingData: data => dispatch(getBookingDetail(data)),
  onClearPostData: () => dispatch(clearPostData()),
  onRemoveBooking: data => dispatch(removeBooking(data))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(FieldsPage);
