import React, { useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeContext } from "context/themeContext";
import { ThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import Button from "@material-ui/core/Button";

import getTheme from "utils/theme";
import LoginPage from "containers/LoginPage";
import RegisterPage from "containers/RegisterPage";
import ProfilePage from "containers/ProfilePage";
import PrivateRoute from "components/PrivateRoute";

import useStyles from "./style";

const Main = () => {
  const { darkMode, setIsMobile } = useContext(ThemeContext);
  const classes = useStyles();

  const handleResize = () => setIsMobile(window.innerWidth < 600);

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

  const notistackRef = React.createRef();
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <ThemeProvider theme={getTheme(darkMode)}>
      <SnackbarProvider
        maxSnack={4}
        ref={notistackRef}
        action={key => (
          <Button
            onClick={onClickDismiss(key)}
            className={classes.snackBarButton}
          >
            Dismiss
          </Button>
        )}
        autoHideDuration={8000}
        classes={{
          root: classes.snackBarRoot
        }}
      >
        <BrowserRouter>
          <CssBaseline />
          <Switch key="routes">
            <Route path="/login" component={LoginPage} exact />
            <Route path="/register" component={RegisterPage} exact />
            <PrivateRoute path="/profile" component={ProfilePage} />
            <Route path="" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default Main;