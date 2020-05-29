import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "containers/HomePage";
import ProfilePage from "containers/ProfilePage";
import PrivateRoute from "components/PrivateRoute";
import { Link } from "react-router-dom";

const Main = () => {
  const NotFound = () => (
    <h1>
      <Link to="/">Not found</Link>
    </h1>
  );
  return (
    <BrowserRouter>
      <Switch key="routes">
        <PrivateRoute path="/" component={HomePage} exact />
        <PrivateRoute path="/profile" component={ProfilePage} exact />
        <Route path="" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
