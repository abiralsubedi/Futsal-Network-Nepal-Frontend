import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { useSnackbar } from "notistack";
import ImageViewer from "react-simple-image-viewer";

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
  onClearUserInfo
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

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    username: "",
    location: "",
    emailAddress: "",
    credit: 0,
    userPhoto: ""
  });
  const [viewPhotoUrl, setViewPhotoUrl] = useState(false);

  const updateUserInfo = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  const {
    fullName,
    username,
    location,
    emailAddress,
    credit,
    userPhoto
  } = userInfo;

  useEffect(() => {
    getProfileInfo({ userId: selectedUserId });

    return () => {
      onClearUserInfo();
    };
  }, []);

  useEffect(() => {
    if (!getProfileInfoLoading && profileInfo) {
      const pickedInfo = (({
        fullName,
        username,
        location,
        emailAddress,
        credit,
        photoUri
      }) => ({
        fullName,
        username,
        location,
        emailAddress,
        credit,
        userPhoto: photoUri
      }))(profileInfo);
      setUserInfo(pickedInfo);
    }
  }, [getProfileInfoLoading]);

  useEffect(() => {
    if (!postProfileLoading && profileInfo) {
      updateUserInfo("userPhoto", profileInfo.photoUri);
    }
  }, [postProfileLoading]);

  useEffect(() => {
    if (postProfileError) {
      enqueueSnackbar(postProfileError, {
        variant: "error",
        onClose: () => onClearMessage()
      });
    }
    if (postProfileSuccess) {
      enqueueSnackbar(postProfileSuccess, {
        variant: "success",
        onClose: () => onClearMessage()
      });
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
              id="location"
              label="Location"
              value={location}
              handleChange={val => updateUserInfo("location", val)}
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
              handleChange={val => updateUserInfo("credit", Math.ceil(val))}
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
  onClearUserInfo: PropTypes.func
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
