import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";

import Modal from "components/Modal";
import Button from "components/Button";
import TextField from "components/TextField";

import checkValidEmail from "utils/checkValidEmail";

import useStyles from "./style";

const ChangeEmailModal = ({ open, handleClose, loading, handleConfirm }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    setNewEmail("");
  }, [open]);

  const onSubmitChangeEmail = () => {
    if (!checkValidEmail(newEmail)) {
      return enqueueSnackbar("Email is invalid", {
        variant: "error"
      });
    }
    handleConfirm(newEmail.trim());
  };

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Change your Email Address"
    >
      <Typography>
        Please fill your new email address and you will receive confirmation
        email.
      </Typography>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmitChangeEmail();
        }}
      >
        <TextField
          id="forgot-email"
          label="New Email"
          type="email"
          value={newEmail}
          handleChange={val => setNewEmail(val)}
          autoFocus
          required
          fullWidth
          customClasses={classes.changeEmailField}
        />
        <Button
          variant="contained"
          size="large"
          color="primary"
          type="submit"
          fullWidth
          disabled={loading}
          actionLoading={loading}
          buttonText="Confirm"
        />
      </form>
    </Modal>
  );
};

ChangeEmailModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  loading: PropTypes.bool,
  handleConfirm: PropTypes.func
};

export default ChangeEmailModal;
