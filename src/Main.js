import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "containers/HomePage";
import ProfilePage from "containers/ProfilePage";

const Main = () => {
  const NotFound = () => <h1>Not found</h1>;
  return (
    <BrowserRouter>
      <Switch key="routes">
        <Route path="/" component={HomePage} exact />
        <Route path="/profile" component={ProfilePage} exact />
        <Route path="" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
