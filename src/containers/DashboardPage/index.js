import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import { Wrapper } from "components/Common";

import useStyles from "./style";

const DashboardPage = ({ globalData }) => {
  const classes = useStyles();

  const {
    profile: { fullName }
  } = globalData;

  return (
    <Wrapper>
      <div className={classes.dashboardContainer}>
        <Typography>
          Hello <strong>{fullName}</strong>, Welcome to ongoing dashboard.
          Please visit your profile <Link to="/profile">here</Link>.
        </Typography>
      </div>
    </Wrapper>
  );
};

DashboardPage.propTypes = {
  globalData: PropTypes.object
};

const mapStateToProps = state => ({
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DashboardPage);
