import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";

import Modal from "components/Modal";
import Button from "components/Button";
import GooglePlaceAutoComplete from "components/GooglePlaceAutoComplete";

import useStyles from "./style";

const ChangeLocationModal = ({
  open,
  handleClose,
  handleConfirm,
  currentPlace
}) => {
  const classes = useStyles();

  const [location, setLocation] = useState("");

  useEffect(() => {
    setLocation(currentPlace);
  }, [open]);

  return (
    <Modal open={open} handleClose={handleClose} title="Change Location">
      <Typography>
        Please select a location. Changes will be made after you save them.
      </Typography>
      <div className={classes.changeLocationField}>
        <GooglePlaceAutoComplete
          currentPlace={location.place}
          handleChangePlace={item => {
            const lat = item.geometry.location.lat();
            const lng = item.geometry.location.lng();
            setLocation({
              place: item.formatted_address,
              coordinates: { lat, lng }
            });
          }}
        />
      </div>
      <Button
        variant="contained"
        size="large"
        color="primary"
        type="submit"
        fullWidth
        buttonText="Confirm"
        onClick={() => {
          handleConfirm(location);
          handleClose();
        }}
      />
    </Modal>
  );
};

ChangeLocationModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleConfirm: PropTypes.func,
  currentPlace: PropTypes.string
};

export default ChangeLocationModal;
