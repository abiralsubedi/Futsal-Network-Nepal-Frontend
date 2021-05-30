import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { useSnackbar } from "notistack";
import ImageViewer from "react-simple-image-viewer";

import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import TextField from "components/TextField";
import Button from "components/Button";
import Loader from "components/Loader";
import ImageHolder from "components/ImageHolder";

import checkValidEmail from "utils/checkValidEmail";

import {
  postProfileInfo,
  clearMessage,
  getProfileInfo,
  clearUserInfo
} from "./actions";
import useStyles from "./style";

const AddUser = ({
  addUserData,
  saveProfileInfo,
  onClearMessage,
  getProfileInfo,
  match,
  onClearUserInfo,
  history
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const {
    getProfileInfoLoading,
    profileInfo,
    postProfileLoading,
    postProfileSuccess,
    postProfileError
  } = addUserData;

  const selectedUserId = match.params.userId;

  const [userInfo, setUserInfo] = useState(() => ({
    fullName: "",
    username: "",
    phone: "",
    emailAddress: "",
    credit: 0,
    userPhoto: "",
    newPassword: ""
  }));
  const [viewPhotoUrl, setViewPhotoUrl] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const updateUserInfo = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  const {
    fullName,
    username,
    phone,
    emailAddress,
    credit,
    userPhoto,
    newPassword
  } = userInfo;

  useEffect(() => {
    if (selectedUserId) {
      getProfileInfo({ userId: selectedUserId });
    }

    return () => {
      onClearUserInfo();
    };
  }, []);

  useEffect(() => {
    if (!getProfileInfoLoading && profileInfo) {
      const pickedInfo = (({
        fullName,
        username,
        phone,
        emailAddress,
        credit,
        photoUri
      }) => ({
        fullName,
        username,
        phone,
        emailAddress,
        credit,
        userPhoto: photoUri,
        newPassword: ""
      }))(profileInfo);
      setUserInfo(pickedInfo);
    }
  }, [getProfileInfoLoading]);

  useEffect(() => {
    if (postProfileError) {
      enqueueSnackbar(postProfileError, {
        variant: "error",
        onClose: () => onClearMessage()
      });
      updateUserInfo("userPhoto", profileInfo.photoUri);
    }
    if (postProfileSuccess) {
      let successMessage = "Profile updated successfully!";
      if (!selectedUserId) {
        successMessage = "Profile created successfully";
      }
      setUserInfo({
        ...userInfo,
        newPassword: "",
        userPhoto: profileInfo.photoUri
      });
      enqueueSnackbar(successMessage, {
        variant: "success",
        onClose: () => onClearMessage()
      });
      if (!selectedUserId) {
        history.replace(`/people/users/edit/${postProfileSuccess._id}`);
      }
    }
  }, [postProfileError, postProfileSuccess]);

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!checkValidEmail(emailAddress)) {
      return enqueueSnackbar("Email is invalid", {
        variant: "error",
        onClose: () => onClearMessage()
      });
    }
    saveProfileInfo({ ...userInfo, userId: selectedUserId });
  };

  if (getProfileInfoLoading) {
    return <Loader wrapperClass={classes.infoLoadingWrapper} />;
  }

  return (
    <div className={classes.addUserContent}>
      <form onSubmit={handleFormSubmit}>
        <ImageHolder
          noCaption
          image={userPhoto}
          wrapperClass={classes.userImageContainer}
          handleImageClick={url => setViewPhotoUrl(url)}
          handleImageEdit={imageFormData =>
            updateUserInfo("userPhoto", imageFormData)
          }
          handleImageRemove={() => updateUserInfo("userPhoto", "")}
          index={1}
        />
        <Grid container spacing={3}>
          <Grid item lg={5} md={6} xs={12}>
            <TextField
              id="fullName"
              label="Full Name"
              value={fullName}
              handleChange={val => updateUserInfo("fullName", val)}
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
              handleChange={val => updateUserInfo("username", val)}
              required
              fullWidth
            />
          </Grid>
          <Grid item lg={5} md={6} xs={12}>
            <TextField
              id="phone"
              label="Phone"
              value={phone}
              handleChange={val => updateUserInfo("phone", val)}
              fullWidth
            />
          </Grid>
          <Grid item lg={5} md={6} xs={12}>
            <TextField
              id="email"
              label="Email"
              value={emailAddress}
              handleChange={val => updateUserInfo("emailAddress", val)}
              required
              fullWidth
            />
          </Grid>
          <Grid item lg={5} md={6} xs={12}>
            <TextField
              id="credit"
              label="Credit"
              value={credit}
              type="number"
              maxDecimalValue={2}
              handleChange={val => updateUserInfo("credit", val)}
              fullWidth
              inputProps={{
                min: 0
              }}
            />
          </Grid>
          {!profileInfo.googleId && (
            <Grid item lg={5} md={6} xs={12}>
              <TextField
                id="new-password"
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                handleChange={val => updateUserInfo("newPassword", val)}
                fullWidth
                required={!selectedUserId}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowNewPassword(prevState => !prevState)
                      }
                      edge="end"
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
          )}
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
      <div className="custom-image-viewer single">
        {viewPhotoUrl && (
          <ImageViewer
            src={[viewPhotoUrl]}
            currentIndex={0}
            onClose={() => setViewPhotoUrl(false)}
          />
        )}
      </div>
    </div>
  );
};

AddUser.propTypes = {
  addUserData: PropTypes.object,
  saveProfileInfo: PropTypes.func,
  onClearMessage: PropTypes.func,
  getProfileInfo: PropTypes.func,
  match: PropTypes.object,
  onClearUserInfo: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  addUserData: state.AddUserReducer
});

const mapDispatchToProps = dispatch => ({
  saveProfileInfo: data => dispatch(postProfileInfo(data)),
  getProfileInfo: data => dispatch(getProfileInfo(data)),
  onClearMessage: () => dispatch(clearMessage()),
  onClearUserInfo: () => dispatch(clearUserInfo())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(AddUser);
