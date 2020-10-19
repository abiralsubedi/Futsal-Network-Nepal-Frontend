import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";

import { useSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import DatePicker from "components/DatePicker";
import SelectField from "components/SelectField";
import Button from "components/Button";
import ConfirmationModal from "components/ConfirmationModal";
import AddCreditModal from "components/AddCreditModal";

import { toggleAddCreditModal } from "containers/LoginPage/actions";

import getDateTime from "utils/getDateTime";

import {
  getField,
  getGameHour,
  postBooking,
  clearBookingData,
  clearPostData
} from "./actions";
import useStyles from "./style";

const BookingPage = ({
  onClearBookingData,
  fetchField,
  fetchGameHour,
  bookingPageData,
  globalData: { profile },
  match,
  saveBooking,
  onClearPostData,
  onToggleCreditModal
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [bookingDate, setBookingDate] = useState(new Date());
  const [selectedField, setSelectedField] = useState(null);
  const [selectedGameHour, setSelectedGameHour] = useState(null);
  const [bookingDetail, setBookingDetail] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState(5);

  const {
    getFieldLoading,
    field,
    getGameHourLoading,
    gameHour,
    postBookingError,
    postBookingSuccess,
    postBookingLoading
  } = bookingPageData;

  const vendorId = match.params.vendorId || profile._id;

  useEffect(() => {
    if (postBookingError) {
      enqueueSnackbar(postBookingError, {
        variant: "error",
        onClose: () => onClearPostData()
      });
    }
    if (postBookingSuccess) {
      enqueueSnackbar(postBookingSuccess, {
        variant: "success",
        onClose: () => onClearPostData()
      });
      setSelectedField(null);
      setSelectedGameHour(null);
    }
    setBookingDetail(false);
  }, [postBookingError, postBookingSuccess]);

  useEffect(() => {
    fetchField({ vendorId });

    return () => {
      onClearBookingData();
    };
  }, []);

  useEffect(() => {
    if (selectedField) {
      fetchGameHour({ vendorId, query: getGameHourParam() });
      setSelectedGameHour(null);
    }
  }, [selectedField, bookingDate]);

  const getGameHourParam = () => {
    const fieldQuery = `fieldId=${selectedField._id}`;
    const dateQuery = `&bookingDate=${getDateTime(bookingDate, "dashedDate")}`;
    const dayQuery = `&day=${new Date(bookingDate).getDay()}`;

    return fieldQuery + dateQuery + dayQuery;
  };

  const checkEnoughBalance = () => {
    let reqAmount = selectedGameHour.price - profile.credit;
    if (reqAmount <= 0) {
      return setBookingDetail(selectedGameHour);
    }
    reqAmount = Math.ceil(reqAmount);
    if (reqAmount < 5) {
      reqAmount = 5;
    }
    setTopUpAmount(reqAmount);
    return onToggleCreditModal(true);
  };

  const gameHourListMemo = useMemo(() => {
    if (bookingDate.toDateString() !== new Date().toDateString()) {
      return gameHour;
    }
    const updatedHour = [];
    (gameHour || []).forEach(item => {
      const bookingTime = new Date().setHours(item.clock.clockNo, 0, 0);
      const isPassed =
        Date.parse(new Date()) > Date.parse(new Date(bookingTime));

      if (!isPassed) {
        updatedHour.push(item);
      }
    });
    return updatedHour;
  }, [getGameHourLoading]);

  const getConfirmationText = () => {
    if (!bookingDetail) {
      return "";
    }
    return `You are about to book game at ${
      bookingDetail && bookingDetail.clock.fullName
    } on ${getDateTime(bookingDate, "onlyDate")} for $${bookingDetail.price}`;
  };

  return (
    <div className={classes.bookingContent}>
      <AddCreditModal topUpAmount={topUpAmount} />
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <div>
            <DatePicker
              label="Date"
              value={bookingDate}
              onChange={setBookingDate}
              autoOk
              disablePast
              maxDate={new Date().setDate(new Date().getDate() + 7)}
            />
          </div>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <SelectField
            options={field}
            getOptionLabel={option => option.name}
            label="Field"
            value={selectedField}
            handleChange={opt => setSelectedField(opt)}
            getOptionSelected={(option, value) => option.name === value.name}
            isLoading={getFieldLoading}
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <SelectField
            options={gameHourListMemo}
            getOptionLabel={option => option.clock.fullName}
            label="Available Hour"
            value={selectedGameHour}
            handleChange={opt => setSelectedGameHour(opt)}
            getOptionSelected={(option, value) => option._id === value._id}
            isLoading={getGameHourLoading}
            disabled={!selectedField}
            noOptionsText="No game available"
          />
        </Grid>
      </Grid>
      <Box mt={4}>
        <Typography variant="h6" color="textSecondary">
          Price($): {selectedGameHour ? selectedGameHour.price : "--"}
        </Typography>
      </Box>
      <Button
        variant="contained"
        size="large"
        color="primary"
        fullWidth
        onClick={() => checkEnoughBalance()}
        disabled={!selectedGameHour}
        buttonRootClass={classes.bookingButtonRoot}
        buttonText="Book Now"
      />
      <ConfirmationModal
        open={!!bookingDetail}
        handleClose={() => setBookingDetail(false)}
        title="Confirm Booking"
        confirmationText={getConfirmationText()}
        handleConfirm={() =>
          saveBooking({
            vendorId,
            fieldId: selectedField._id,
            gameHourId: selectedGameHour._id,
            bookingDate: getDateTime(bookingDate, "dashedDate")
          })
        }
        transitionDuration={{ exit: 0 }}
        loading={postBookingLoading}
      />
    </div>
  );
};

BookingPage.propTypes = {
  fetchField: PropTypes.func,
  fetchGameHour: PropTypes.func,
  saveBooking: PropTypes.func,
  onClearBookingData: PropTypes.func,
  onClearPostData: PropTypes.func,
  bookingPageData: PropTypes.object,
  globalData: PropTypes.object,
  match: PropTypes.object,
  onToggleCreditModal: PropTypes.func
};

const mapStateToProps = state => ({
  bookingPageData: state.BookingPageReducer,
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({
  fetchField: data => dispatch(getField(data)),
  fetchGameHour: data => dispatch(getGameHour(data)),
  saveBooking: data => dispatch(postBooking(data)),
  onClearBookingData: () => dispatch(clearBookingData()),
  onClearPostData: () => dispatch(clearPostData()),
  onToggleCreditModal: data => dispatch(toggleAddCreditModal(data))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(BookingPage);
