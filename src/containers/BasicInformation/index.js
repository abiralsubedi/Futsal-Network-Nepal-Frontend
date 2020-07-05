import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
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

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

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
          saveProfileInfo({ username, fullName });
        }}
      >
        <ImageField
          images={[
            "https://assets-devap.innovatetech.io/images/landscape_c15d7d0a-400e-45b8-ad99-63ad0d8a9832_3754.jpeg"
          ]}
        />
        <Grid container spacing={3}>
          <Grid item lg={5} md={6} xs={12}>
            <TextField
              id="username"
              label="Username"
              value={username}
              handleChange={val => setUsername(val)}
              autoFocus
              required
              fullWidth
            />
          </Grid>
          <Grid item lg={5} md={6} xs={12}>
            <TextField
              id="fullName"
              label="Full Name"
              value={fullName}
              handleChange={val => setFullName(val)}
              required
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
        >
          {postProfileLoading && (
            <CircularProgress
              color="inherit"
              size="1.25rem"
              classes={{ root: classes.circularInformationRoot }}
            />
          )}
          Save Changes
        </Button>
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
  globalData: state.ProfileReducer,
  basicInformationData: state.BasicInformationReducer
});

const mapDispatchToProps = dispatch => ({
  saveProfileInfo: data => dispatch(postProfileInfo(data)),
  onClearInformationMessage: () => dispatch(clearMessage())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProfilePage);
