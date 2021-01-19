import React from "react";
import { Provider } from "react-redux";
import ThemeContextProvider from "context/themeContext";

import configureStore from "./configureStore";
import Main from "containers/Main";

import "assets/App.css";

export default () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <Main />
      </ThemeContextProvider>
    </Provider>
  );
};
