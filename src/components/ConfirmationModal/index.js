import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import Modal from "components/Modal";
import Button from "components/Button";

import useStyles from "./style";

const ConfirmationModal = ({
  open,
  handleClose,
  title,
  loading,
  confirmationText,
  handleConfirm
}) => {
  const classes = useStyles();

  return (
    <Modal open={open} handleClose={handleClose} title={title}>
      <Typography variant="body1">{confirmationText}</Typography>
      <div className={classes.confirmationAction}>
        <Button
          size="large"
          color="primary"
          fullWidth
          buttonRootClass={classes.confirmationButtonRoot}
          style={{ marginRight: "1rem" }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="large"
          color="primary"
          fullWidth
          disabled={loading}
          buttonRootClass={classes.confirmationButtonRoot}
          onClick={handleConfirm}
        >
          {loading && (
            <CircularProgress
              color="inherit"
              size="1.25rem"
              classes={{ root: classes.circularConfirmationRoot }}
            />
          )}
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  loading: PropTypes.bool,
  confirmationText: PropTypes.string,
  handleConfirm: PropTypes.func
};

export default ConfirmationModal;
