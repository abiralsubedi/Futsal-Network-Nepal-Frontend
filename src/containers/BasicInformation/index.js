import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import TextField from "components/TextField";
import Button from "components/Button";

import { getTestData } from "./actions";
import useStyles from "./style";

const ProfilePage = ({ profileData, fetchTestData }) => {
  const { testData } = profileData;
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    // fetchTestData();
  }, []);

  return (
    <div className={classes.basicInformationContent}>
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log("submitted");
        }}
      >
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
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
          <Grid item md={6} xs={12}>
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
          disabled={profileData.isLoading}
          buttonRootClass={classes.informationButtonRoot}
        >
          {profileData.isLoading && (
            <CircularProgress
              color="inherit"
              size="1.5rem"
              classes={{ root: classes.circularRoot }}
            />
          )}
          SIGN IN NOW
        </Button>
      </form>
    </div>
  );
};

ProfilePage.propTypes = {
  profileData: PropTypes.object,
  fetchTestData: PropTypes.func
};

const mapStateToProps = state => ({ profileData: state.ProfileReducer });

const mapDispatchToProps = dispatch => ({
  fetchTestData: () => dispatch(getTestData())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProfilePage);
