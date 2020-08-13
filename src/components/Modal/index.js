import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";

import CancelIcon from "@material-ui/icons/Cancel";

import useStyles from "./style";

const CustomModal = ({ open, handleClose, title, children, ...rest }) => {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
      classes={{
        paper: classes.dialogPaperRoot
      }}
      {...rest}
    >
      <div className={classes.dialogContent}>
        <div className={classes.dialogTitle}>
          <div>{title}</div>
          <div onClick={handleClose}>
            <CancelIcon />
          </div>
        </div>
        <hr />
        <div className={classes.dialogBody}>{children}</div>
      </div>
    </Dialog>
  );
};

CustomModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node
};

export default CustomModal;
