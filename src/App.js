import React from "react";
import { Provider } from "react-redux";

import store from "./configureStore";
import Home from "./Home";

import "./App.scss";

export default () => (
  <Provider store={store}>
    <Home />
  </Provider>
);
