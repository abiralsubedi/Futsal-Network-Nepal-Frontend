import React, { useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeContext } from "context/themeContext";
import { ThemeProvider } from "@material-ui/core/styles";

import getTheme from "utils/theme";
import LoginPage from "containers/LoginPage";
import RegisterPage from "containers/RegisterPage";
import ProfilePage from "containers/ProfilePage";
import PrivateRoute from "components/PrivateRoute";

const Main = () => {
  const { darkMode, setIsMobile } = useContext(ThemeContext);

  const handleResize = () => setIsMobile(window.innerWidth < 576);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const NotFound = () => (
    <h1>
      <Link to="/login">Not found</Link>
    </h1>
  );
  return (
    <ThemeProvider theme={getTheme(darkMode)}>
      <BrowserRouter>
        <CssBaseline />
        <Switch key="routes">
          <Route path="/login" component={LoginPage} exact />
          <Route path="/register" component={RegisterPage} exact />
          <PrivateRoute path="/profile" component={ProfilePage} exact />
          <Route path="" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Main;
