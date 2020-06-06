import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { getTestData } from "./actions";
import useStyles from "./style";

const ProfilePage = ({ profileData, fetchTestData }) => {
  const { testData } = profileData;
  const classes = useStyles();

  useEffect(() => {
    fetchTestData();
  }, []);

  return (
    <h1 className={classes.title}>
      <Link to="/">{(testData[0] && testData[0].title) || <>Loading</>}</Link>
    </h1>
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
