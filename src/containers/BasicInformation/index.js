import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import Grid from "@material-ui/core/Grid";
import { useSnackbar } from "notistack";

import ImageField from "containers/ImageField";
import TextField from "components/TextField";
import Button from "components/Button";

import { postProfileInfo, clearMessage } from "./actions";
import useStyles from "./style";

const ProfilePage = ({
  globalData,
  saveProfileInfo,
  basicInformationData,
  onClearInformationMessage
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const {
    postProfileLoading,
    postProfileSuccess,
    postProfileError
  } = basicInformationData;

  const { profile } = globalData;

  const [fullName, setFullName] = useState(profile.fullName);
  const [username, setUsername] = useState(profile.username);
  const [location, setLocation] = useState(profile.location);
  const [emailAddress, setEmailAddress] = useState(profile.emailAddress);

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
  }, [postProfileError, postProfileSuccess]);

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
    </div>
  );
};

ProfilePage.propTypes = {
  globalData: PropTypes.object,
  basicInformationData: PropTypes.object,
  saveProfileInfo: PropTypes.func,
  onClearInformationMessage: PropTypes.func
};

const mapStateToProps = state => ({
  globalData: state.LoginReducer,
  basicInformationData: state.BasicInformationReducer
});

const mapDispatchToProps = dispatch => ({
  saveProfileInfo: data => dispatch(postProfileInfo(data)),
  onClearInformationMessage: () => dispatch(clearMessage())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProfilePage);
