import "date-fns";
import React, { useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import Button from "@material-ui/core/Button";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { ThemeContext } from "context/themeContext";
import getTheme from "utils/theme";

import LoginPage from "containers/LoginPage";
import RegisterPage from "containers/RegisterPage";
import SetPasswordPage from "containers/SetPasswordPage";
import ProfilePage from "containers/ProfilePage";
import AdminPeoplePage from "containers/Admin/PeoplePage";
import DashboardPage from "containers/DashboardPage";
import PrivateRoute from "components/PrivateRoute";
import PublicRoute from "components/PublicRoute";
import NotFoundPage from "components/NotFoundPage";

import useStyles from "./style";

const Main = () => {
  const { darkMode, setIsMobile } = useContext(ThemeContext);
  const classes = useStyles();

  const handleResize = () => setIsMobile(window.innerWidth < 960);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <BrowserRouter>
            <CssBaseline />
            <Switch key="routes">
              <PublicRoute path="/login" component={LoginPage} exact />
              <PublicRoute path="/register" component={RegisterPage} exact />
              <Route path="/set-password" component={SetPasswordPage} exact />
              <PrivateRoute exact path="/" component={DashboardPage} />
              <PrivateRoute path="/profile" component={ProfilePage} />
              <PrivateRoute
                path="/people/users/edit/:userId"
                exact
                component={{ Admin: AdminPeoplePage }}
              />
              <PrivateRoute
                path="/people/vendors/edit/:vendorId"
                exact
                component={{ Admin: AdminPeoplePage }}
              />
              <PrivateRoute
                path="/people"
                component={{ Admin: AdminPeoplePage }}
              />
              <Route path="" component={NotFoundPage} />
            </Switch>
          </BrowserRouter>
        </MuiPickersUtilsProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default Main;
