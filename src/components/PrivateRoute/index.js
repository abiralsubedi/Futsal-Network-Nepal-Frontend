import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "components/Header";

const PrivateRoute = ({ component: Component, ...rest }) => (
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

PrivateRoute.propTypes = { component: PropTypes.func };

export default PrivateRoute;
