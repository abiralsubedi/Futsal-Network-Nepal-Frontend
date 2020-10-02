import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";

import Modal from "components/Modal";
import Button from "components/Button";

import useStyles from "./style";

const ConfirmationModal = ({
  open,
  handleClose,
  title,
  loading,
  confirmationText,
  handleConfirm,
  confirmationBody,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Modal open={open} handleClose={handleClose} title={title} {...rest}>
      <Typography variant="body1">{confirmationText}</Typography>
      {confirmationBody}
      <div className={classes.confirmationAction}>
        <Button
          size="large"
          color="primary"
          fullWidth
          buttonRootClass={classes.confirmationButtonRoot}
          style={{ marginRight: "1rem" }}
          onClick={handleClose}
          buttonText="Cancel"
        />
        <Button
          variant="contained"
          size="large"
          color="primary"
          fullWidth
          disabled={loading}
          buttonRootClass={classes.confirmationButtonRoot}
          onClick={handleConfirm}
          actionLoading={loading}
          buttonText="Confirm"
        />
      </div>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  loading: PropTypes.bool,
  confirmationText: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.node
  ]),
  confirmationBody: PropTypes.node,
  handleConfirm: PropTypes.func
};

export default ConfirmationModal;
