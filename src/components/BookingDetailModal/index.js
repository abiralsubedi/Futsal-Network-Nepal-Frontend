import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";

import Modal from "components/Modal";
import Button from "components/Button";

import getDateTime from "utils/getDateTime";

import useStyles from "./style";

const AddFieldModal = ({ open, handleClose, bookingDetail }) => {
  const classes = useStyles();

  const contentKey = [{ label: "Futsal Name", key: "vendor.f" }];

  const getContent = () => {
    if (!bookingDetail) {
      return "";
    }
    return (
      <>
        <Typography>
          Futsal Name: {bookingDetail.vendor.fullName}
          <br />
          Booking Date: {getDateTime(bookingDetail.bookingDate, "onlyDate")}
          <br />
          Time: {bookingDetail.workingHour.clock.fullName}
          <br />
          Field Name: {bookingDetail.field.name} <br />
          Price: ${bookingDetail.workingHour.price} <br />
          Status: {bookingDetail.status} <br />
          Booked on: {getDateTime(bookingDetail.createdAt, "onlyDate")}
        </Typography>
      </>
    );
  };

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Booking Detail"
      transitionDuration={{ exit: 0 }}
    >
      <div className={classes.bookingDetailContent}>
        {getContent()}
        <Button
          size="large"
          color="primary"
          fullWidth
          buttonRootClass={classes.bookingDetailButton}
          buttonText="Close"
          variant="contained"
          onClick={() => handleClose()}
        />
      </div>
    </Modal>
  );
};

AddFieldModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  addFieldData: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
};

export default AddFieldModal;
