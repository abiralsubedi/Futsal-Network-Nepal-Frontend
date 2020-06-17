import React from "react";
import { Provider } from "react-redux";
import ThemeContextProvider from "context/themeContext";

import store from "./configureStore";
import Main from "containers/Main";

import "assets/App.css";

export default () => {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <Main />
      </ThemeContextProvider>
    </Provider>
  );
};
