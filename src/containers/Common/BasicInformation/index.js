import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import Grid from "@material-ui/core/Grid";
import { useSnackbar } from "notistack";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import ImageField from "containers/Common/ImageField";
import TextField from "components/TextField";
import Button from "components/Button";
import ChangeEmailModal from "components/ChangeEmailModal";
import ChangeLocationModal from "components/ChangeLocationModal";

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
  const isVendor = profile.role === "Vendor";

  const [fullName, setFullName] = useState(profile.fullName);
  const [username, setUsername] = useState(profile.username);
  const [location, setLocation] = useState(profile.location);
  const [phone, setPhone] = useState(profile.phone);
  const [emailAddress, setEmailAddress] = useState(profile.emailAddress);
  const [changeEmailActive, setChangeEmailActive] = useState(false);
  const [changeLocation, setChangeLocation] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setFullName(profile.fullName);
      setUsername(profile.username);
      setLocation(profile.location);
      setEmailAddress(profile.emailAddress);
      setPhone(profile.phone);
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
      enqueueSnackbar("An email has been sent to you.", {
        variant: "success",
        onClose: () => onClearInformationMessage()
      });
      setChangeEmailActive(false);
    }
  }, [
    postProfileError,
    postProfileSuccess,
    postChangeEmailError,
    postChangeEmailSuccess
  ]);

  return (
    <div className={classes.basicInformationContent}>
      <form
        onSubmit={e => {
          e.preventDefault();
          saveProfileInfo({ username, fullName, location, phone });
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
              data-cy="profile-full-name"
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
              id="phone"
              label="Phone"
              value={phone}
              handleChange={val => setPhone(val)}
              required
              fullWidth
            />
          </Grid>
          {isVendor && (
            <Grid item lg={5} md={6} xs={12}>
              <TextField
                id="location"
                label="Location"
                value={location.place}
                required
                disabled
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setChangeLocation(true)}
                      edge="end"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
          )}
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
                      <EditIcon fontSize="small" />
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
          data-cy="basic-info-save"
        />
      </form>

      <ChangeEmailModal
        open={changeEmailActive}
        handleClose={() => setChangeEmailActive(false)}
        loading={postChangeEmailLoading}
        handleConfirm={newEmail => saveChangeEmail({ newEmail })}
      />
      <ChangeLocationModal
        open={changeLocation}
        handleClose={() => setChangeLocation(false)}
        currentPlace={location}
        handleConfirm={newLocation => setLocation(newLocation)}
      />
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
