import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useSnackbar } from "notistack";

import TextField from "components/TextField";
import Button from "components/Button";
import ConfirmationModal from "components/ConfirmationModal";

import { postPassword, clearMessage, unLinkEmail } from "./actions";
import useStyles from "./style";
import { Typography } from "@material-ui/core";

const ChangePassword = ({
  savePassword,
  changePasswordData,
  onClearInformationMessage,
  globalData,
  onUnLinkEmail
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const { profile } = globalData;
  const {
    postPasswordLoading,
    postPasswordSuccess,
    postPasswordError
  } = changePasswordData;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [linkAccountActive, setLinkAccountActive] = useState(false);

  useEffect(() => {
    if (postPasswordError) {
      enqueueSnackbar(postPasswordError, {
        variant: "error",
        onClose: () => onClearInformationMessage()
      });
    }
    if (postPasswordSuccess) {
      enqueueSnackbar(postPasswordSuccess, {
        variant: "success",
        onClose: () => onClearInformationMessage()
      });
      setOldPassword("");
      setNewPassword("");
      setLinkAccountActive(false);
    }
  }, [postPasswordError, postPasswordSuccess]);

  const onPasswordSubmit = e => {
    e.preventDefault();
    if (oldPassword === newPassword) {
      return enqueueSnackbar("Both password can not be same", {
        variant: "error"
      });
    }
    savePassword({ oldPassword, newPassword });
  };

  if (profile.googleId) {
    return (
      <div className={classes.changePasswordContent}>
        <Typography variant="body1">
          In order to change password, you need to unlink your account from
          Google.
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => setLinkAccountActive(true)}
          fullWidth
          buttonRootClass={classes.passwordButtonRoot}
          buttonText="Unlink from Google"
        />
        <ConfirmationModal
          open={linkAccountActive}
          handleClose={() => setLinkAccountActive(false)}
          title="Unlink your Google Account"
          confirmationText="If you proceed, you will shortly receive a email to reset password for your account. Do you want to continue?"
          handleConfirm={() => onUnLinkEmail()}
          loading={postPasswordLoading}
        />
      </div>
    );
  }

  return (
    <div className={classes.changePasswordContent}>
      <form onSubmit={onPasswordSubmit}>
        <Grid container spacing={3}>
          <Grid item lg={5} md={6} xs={12}>
            <TextField
              id="old-password"
              label="Old Password"
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              handleChange={val => setOldPassword(val)}
              autoFocus
              required
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowOldPassword(prevState => !prevState)}
                    edge="end"
                  >
                    {showOldPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item lg={5} md={6} xs={12}>
            <TextField
              id="new-password"
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              handleChange={val => setNewPassword(val)}
              required
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowNewPassword(prevState => !prevState)}
                    edge="end"
                  >
                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          size="large"
          color="primary"
          type="submit"
          fullWidth
          disabled={postPasswordLoading}
          buttonRootClass={classes.passwordButtonRoot}
          actionLoading={postPasswordLoading}
          buttonText="Save Changes"
        />
      </form>
    </div>
  );
};

ChangePassword.propTypes = {
  globalData: PropTypes.object,
  changePasswordData: PropTypes.object,
  savePassword: PropTypes.func,
  onClearInformationMessage: PropTypes.func,
  onUnLinkEmail: PropTypes.func
};

const mapStateToProps = state => ({
  changePasswordData: state.ChangePasswordReducer,
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({
  savePassword: data => dispatch(postPassword(data)),
  onUnLinkEmail: () => dispatch(unLinkEmail()),
  onClearInformationMessage: () => dispatch(clearMessage())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ChangePassword);
