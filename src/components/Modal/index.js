import React from "react";
import PropTypes from "prop-types";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

import CancelIcon from "@material-ui/icons/Cancel";

import useStyles from "./style";

const CustomModal = ({ open, handleClose, title, children }) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 200
      }}
    >
      <div className={classes.paper}>
        <div className={classes.modalTitle}>
          <div>{title}</div>
          <div onClick={handleClose}>
            <CancelIcon />
          </div>
        </div>
        <hr />
        <div className={classes.modalContent}>{children}</div>
      </div>
    </Modal>
  );
};

CustomModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node
};

export default CustomModal;
