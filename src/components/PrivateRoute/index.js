import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "components/Header";

const PrivateRoute = ({ component, globalData, ...rest }) => {
  const { isAuthenticated, profile } = globalData;

  if (!isAuthenticated || !profile) {
    return <Redirect to="/login" />;
  }
  const { role } = profile;

  const Component = component["WrappedComponent"] ? component : component[role];
  if (!Component) {
    return <Redirect to="/" />;
  }

  return (
    <Route
      {...rest}
      render={props => {
        return (
          <>
            <Header />
            <Component {...props} />
          </>
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.object,
  globalData: PropTypes.object
};

const mapStateToProps = state => ({ globalData: state.LoginReducer });

export default connect(mapStateToProps)(PrivateRoute);
