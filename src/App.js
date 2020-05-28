import React from "react";
import { Provider } from "react-redux";

import store from "./configureStore";
import Main from "./Main";

import "assets/App.scss";

export default () => (
  <Provider store={store}>
    <Main />
  </Provider>
);
