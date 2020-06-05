import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "components/Header";

const PrivateRoute = ({ component: Component, data, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!data.isAuthenticated) return <Redirect to="/login" />;
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

const mapStateToProps = state => ({ data: state.LoginReducer });

export default connect(mapStateToProps)(PrivateRoute);
