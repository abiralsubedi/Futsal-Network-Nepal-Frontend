import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import LoginPage from "containers/LoginPage";
import RegisterPage from "containers/RegisterPage";
import ProfilePage from "containers/ProfilePage";
import PrivateRoute from "components/PrivateRoute";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

const Main = () => {
  const NotFound = () => (
    <h1>
      <Link to="/login">Not found</Link>
    </h1>
  );
  return (
    <BrowserRouter>
      <CssBaseline />
      <Switch key="routes">
        <Route path="/login" component={LoginPage} exact />
        <Route path="/register" component={RegisterPage} exact />
        <PrivateRoute path="/profile" component={ProfilePage} exact />
        <Route path="" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
