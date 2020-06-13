/* eslint-disable react/require-default-props */
import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);
  return (
    <ThemeContext.Provider
      value={{ darkMode, setDarkMode, isMobile, setIsMobile }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

ThemeContextProvider.propTypes = {
  children: PropTypes.node
};

export default ThemeContextProvider;
