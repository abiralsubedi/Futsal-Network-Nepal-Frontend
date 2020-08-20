import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "components/Header";

const PrivateRoute = ({ component, globalData, ...rest }) => {
  const { isAuthenticated, profile } = globalData;
  const { role } = profile;

  const Component = component["WrappedComponent"] ? component : component[role];

  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuthenticated || !profile) {
          return <Redirect to="/login" />;
        }
        if (!Component) {
          return <Redirect to="/" />;
        }
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
