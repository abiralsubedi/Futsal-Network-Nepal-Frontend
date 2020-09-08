import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { useSnackbar } from "notistack";
import ImageViewer from "react-simple-image-viewer";

import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveCircleOutlineRoundedIcon from "@material-ui/icons/RemoveCircleOutlineRounded";

import TextField from "components/TextField";
import SelectField from "components/SelectField";
import Button from "components/Button";
import Loader from "components/Loader";
import ImageHolder from "components/ImageHolder";

import checkValidEmail from "utils/checkValidEmail";

import { getClockData } from "containers/LoginPage/actions";
import {
  postProfileInfo,
  clearMessage,
  getProfileInfo,
  clearUserInfo
} from "./actions";
import useStyles from "./style";

const AddVendor = ({
  addUserData,
  saveProfileInfo,
  onClearMessage,
  getProfileInfo,
  match,
  onClearUserInfo,
  history,
  fetchClockData,
  globalData: { clockDataLoading, clockData }
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

  const selectedUserId = match.params.vendorId;

  const [userInfo, setUserInfo] = useState(() => ({
    fullName: "",
    username: "",
    location: "",
    emailAddress: "",
    credit: 0,
    userPhoto: "",
    newPassword: "",
    phone: ""
  }));
  const [viewPhotoUrl, setViewPhotoUrl] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [startPeriod, setStartPeriod] = useState(null);
  const [endPeriod, setEndPeriod] = useState(null);
  const [price, setPrice] = useState(1);
  const [fields, setFields] = useState([{ name: "" }]);

  const updateUserInfo = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  const {
    fullName,
    username,
    location,
    emailAddress,
    userPhoto,
    newPassword,
    phone
  } = userInfo;

  useEffect(() => {
    if (selectedUserId) {
      getProfileInfo({ userId: selectedUserId });
    }

    if (!clockData.length) {
      fetchClockData();
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
        location,
        emailAddress,
        photoUri,
        phone
      }) => ({
        fullName,
        username,
        location,
        emailAddress,
        phone,
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
        history.replace(`/people/vendors/edit/${postProfileSuccess._id}`);
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
    saveProfileInfo({
      ...userInfo,
      userId: selectedUserId,
      startPeriod,
      endPeriod,
      price,
      fields
    });
  };

  const getFieldAction = index => {
    const isLastIndex = index + 1 === fields.length;
    const hideRemove = index === 0 && fields.length === 1;
    return (
      <>
        {!hideRemove && (
          <Tooltip title="Remove">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                const updatedField = [...fields];
                updatedField.splice(index, 1);
                setFields(updatedField);
              }}
              className={classes.fieldActionIcon}
              edge="end"
            >
              <RemoveCircleOutlineRoundedIcon />
            </IconButton>
          </Tooltip>
        )}
        {isLastIndex && (
          <Tooltip title="Add">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                const updatedField = [...fields];
                updatedField.push({ name: "" });
                setFields(updatedField);
              }}
              className={classes.fieldActionIcon}
              edge="end"
            >
              <AddRoundedIcon />
            </IconButton>
          </Tooltip>
        )}
      </>
    );
  };

  const fieldListMemo = useMemo(
    () => (
      <Grid container spacing={3}>
        {(fields || []).map((field, index) => (
          <Grid item lg={5} md={6} xs={12} key={index + 1}>
            <div className={classes.fieldGroup}>
              <TextField
                id={`field-${index + 1}`}
                label="Field Name"
                value={field.name}
                handleChange={val => {
                  const updatedField = [...fields];
                  updatedField[index].name = val;
                  setFields(updatedField);
                }}
                required
                fullWidth
              />
              <div className={classes.fieldActionItems}>
                {getFieldAction(index)}
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    ),
    [fields]
  );

  const workingHourPriceMemo = useMemo(
    () => (
      <Grid container spacing={3}>
        <Grid item md={4} sm={6} xs={12}>
          <SelectField
            options={clockData}
            getOptionLabel={option => option.name}
            label="First Game at"
            value={startPeriod}
            handleChange={opt => setStartPeriod(opt)}
            getOptionSelected={(option, value) => option.name === value.name}
            isLoading={clockDataLoading}
            disableClearable
            required
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <SelectField
            options={clockData}
            getOptionLabel={option => option.name}
            label="Last game at"
            value={endPeriod}
            handleChange={opt => setEndPeriod(opt)}
            getOptionSelected={(option, value) => option.name === value.name}
            isLoading={clockDataLoading}
            disableClearable
            required
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <TextField
            id="price"
            label="Hourly Price ($)"
            value={price}
            handleChange={val => {
              let updatedVal = val;
              if (+val % 1 !== 0) {
                const decimalIndex = updatedVal.indexOf(".");
                updatedVal =
                  updatedVal.substr(0, decimalIndex) +
                  updatedVal.substr(decimalIndex, 3);
              }
              setPrice(Math.abs(+updatedVal));
            }}
            required
            type="number"
            fullWidth
          />
        </Grid>
      </Grid>
    ),
    [clockData, startPeriod, endPeriod, price]
  );

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
              id="phone"
              label="Phone"
              value={phone}
              handleChange={val => updateUserInfo("phone", val)}
              required
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
        {!selectedUserId && (
          <>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.vendorGroupText}
            >
              Please add required number of fields with name.
            </Typography>
            {fieldListMemo}
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.vendorGroupText}
            >
              Please select the most common start and end game time with hourly
              price.
              <br />
              You can later change it according to day and time.
            </Typography>
            {workingHourPriceMemo}
          </>
        )}
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

AddVendor.propTypes = {
  addUserData: PropTypes.object,
  saveProfileInfo: PropTypes.func,
  onClearMessage: PropTypes.func,
  getProfileInfo: PropTypes.func,
  match: PropTypes.object,
  onClearUserInfo: PropTypes.func,
  history: PropTypes.object,
  globalData: PropTypes.object,
  fetchClockData: PropTypes.func
};

const mapStateToProps = state => ({
  addUserData: state.AddVendorReducer,
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({
  saveProfileInfo: data => dispatch(postProfileInfo(data)),
  getProfileInfo: data => dispatch(getProfileInfo(data)),
  onClearMessage: () => dispatch(clearMessage()),
  fetchClockData: () => dispatch(getClockData()),
  onClearUserInfo: () => dispatch(clearUserInfo())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(AddVendor);
