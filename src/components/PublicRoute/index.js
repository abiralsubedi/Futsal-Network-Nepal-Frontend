import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PublicRoute = ({ component: Component, data, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (data.isAuthenticated && data.profile) return <Redirect to="/" />;
      return (
        <>
          <Component {...props} />
        </>
      );
    }}
  />
);

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

const mapStateToProps = state => ({ data: state.LoginReducer });

export default connect(mapStateToProps)(PublicRoute);
