import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import { Link } from "react-router-dom";

import { Wrapper } from "components/Common";
import TextField from "components/TextField";

import Typography from "@material-ui/core/Typography";

import { getTestData } from "./actions";
import useStyles from "./style";

const ProfilePage = ({ profileData, fetchTestData }) => {
  const { testData } = profileData;
  const classes = useStyles();

  const [username, setUsername] = useState("");

  useEffect(() => {
    fetchTestData();
  }, []);

  return (
    <Wrapper>
      <div className={classes.profileContainer}>
        <Typography variant="h5" color="textSecondary">
          Profile Page
        </Typography>
        <form
          onSubmit={e => {
            e.preventDefault();
            console.log("submitted");
          }}
        >
          <TextField
            id="username"
            label="Username"
            value={username}
            handleChange={val => setUsername(val)}
            autoFocus
            required
            fullWidth
            customClasses={classes.loginTextField}
          />
        </form>
      </div>
      {/* <h1 className={classes.title}>
        <Link to="/">{(testData[0] && testData[0].title) || <>Loading</>}</Link>
      </h1> */}
    </Wrapper>
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
