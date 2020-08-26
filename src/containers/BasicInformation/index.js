import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import ImageField from "containers/ImageField";
import TextField from "components/TextField";
import Button from "components/Button";
import Modal from "components/Modal";

import checkValidEmail from "utils/checkValidEmail";

import { postProfileInfo, clearMessage, postChangeEmail } from "./actions";
import useStyles from "./style";

const ProfilePage = ({
  globalData,
  saveProfileInfo,
  basicInformationData,
  onClearInformationMessage,
  saveChangeEmail
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const {
    postProfileLoading,
    postProfileSuccess,
    postProfileError,
    postChangeEmailLoading,
    postChangeEmailSuccess,
    postChangeEmailError
  } = basicInformationData;

  const { profile, isLoading } = globalData;

  const [fullName, setFullName] = useState(profile.fullName);
  const [username, setUsername] = useState(profile.username);
  const [location, setLocation] = useState(profile.location);
  const [emailAddress, setEmailAddress] = useState(profile.emailAddress);
  const [changeEmailActive, setChangeEmailActive] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    if (!isLoading) {
      setFullName(profile.fullName);
      setUsername(profile.username);
      setLocation(profile.location);
      setEmailAddress(profile.emailAddress);
    }
  }, [isLoading]);

  useEffect(() => {
    if (postProfileError) {
      enqueueSnackbar(postProfileError, {
        variant: "error",
        onClose: () => onClearInformationMessage()
      });
    }
    if (postProfileSuccess) {
      enqueueSnackbar(postProfileSuccess, {
        variant: "success",
        onClose: () => onClearInformationMessage()
      });
    }
    if (postChangeEmailError) {
      enqueueSnackbar(postChangeEmailError, {
        variant: "error",
        onClose: () => onClearInformationMessage()
      });
    }
    if (postChangeEmailSuccess) {
      enqueueSnackbar("You will shortly receive confirmation email.", {
        variant: "success",
        onClose: () => onClearInformationMessage()
      });
      setChangeEmailActive(false);
      setNewEmail("");
    }
  }, [
    postProfileError,
    postProfileSuccess,
    postChangeEmailError,
    postChangeEmailSuccess
  ]);

  const onSubmitChangeEmail = () => {
    if (!checkValidEmail(newEmail)) {
      return enqueueSnackbar("Email is invalid", {
        variant: "error",
        onClose: () => onClearInformationMessage()
      });
    }
    saveChangeEmail({ newEmail });
  };

  return (
    <div className={classes.basicInformationContent}>
      <form
        onSubmit={e => {
          e.preventDefault();
          saveProfileInfo({ username, fullName, location });
        }}
      >
        <ImageField photoUri={profile.photoUri} />
        <Grid container spacing={3}>
          <Grid item lg={5} md={6} xs={12}>
            <TextField
              id="fullName"
              label="Full Name"
              value={fullName}
              handleChange={val => setFullName(val)}
              autoFocus
              required
              fullWidth
            />
          </Grid>
          <Grid item lg={5} md={6} xs={12}>
            <TextField
              id="username"
              label="Username"
              value={username}
              handleChange={val => setUsername(val)}
              required
              fullWidth
            />
          </Grid>
          <Grid item lg={5} md={6} xs={12}>
            <TextField
              id="location"
              label="Location"
              value={location}
              handleChange={val => setLocation(val)}
              required
              fullWidth
            />
          </Grid>
          <Grid item lg={5} md={6} xs={12}>
            <TextField
              id="email"
              label="Email"
              value={emailAddress}
              handleChange={val => setEmailAddress(val)}
              required
              disabled
              fullWidth
              endAdornment={
                !profile.googleId && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setChangeEmailActive(true)}
                      edge="end"
                    >
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                )
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
          disabled={postProfileLoading}
          buttonRootClass={classes.informationButtonRoot}
          actionLoading={postProfileLoading}
          buttonText="Save Changes"
        />
      </form>
      <Modal
        open={changeEmailActive}
        handleClose={() => setChangeEmailActive(false)}
        title="Change your Email Address"
      >
        <Typography>
          Please fill your new email address and you will shortly receive
          confirmation email.
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
            disabled={postChangeEmailLoading}
            actionLoading={postChangeEmailLoading}
            buttonText="Confirm"
          />
        </form>
      </Modal>
    </div>
  );
};

ProfilePage.propTypes = {
  globalData: PropTypes.object,
  basicInformationData: PropTypes.object,
  saveProfileInfo: PropTypes.func,
  onClearInformationMessage: PropTypes.func,
  saveChangeEmail: PropTypes.func
};

const mapStateToProps = state => ({
  globalData: state.LoginReducer,
  basicInformationData: state.BasicInformationReducer
});

const mapDispatchToProps = dispatch => ({
  saveProfileInfo: data => dispatch(postProfileInfo(data)),
  saveChangeEmail: email => dispatch(postChangeEmail(email)),
  onClearInformationMessage: () => dispatch(clearMessage())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProfilePage);
