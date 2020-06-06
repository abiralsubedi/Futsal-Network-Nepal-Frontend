import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { logoutSuccess } from "containers/LoginPage/actions";
import useStyles from "./style";

const Header = props => {
  const classes = useStyles();

  return (
    <div>
      <h1>This is header</h1>
      <h3
        onClick={() => {
          localStorage.removeItem("token");
          props.postLogout();
        }}
        className={classes.logoutButton}
      >
        Logout
      </h3>
    </div>
  );
};

Header.propTypes = {
  postLogout: PropTypes.func
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  postLogout: () => dispatch(logoutSuccess())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(Header);
