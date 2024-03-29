import "date-fns";
import React, { useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { ThemeContext } from "context/themeContext";
import getTheme from "utils/theme";

import LoginPage from "containers/LoginPage";
import RegisterPage from "containers/RegisterPage";
import SetPasswordPage from "containers/SetPasswordPage";
import ProfilePage from "containers/Common/ProfilePage";

import AdminPeoplePage from "containers/Admin/PeoplePage";
import AdminDashboardPage from "containers/Admin/DashboardPage";

import VendorSchedulePage from "containers/Vendor/SchedulePage";
import VendorSitePage from "containers/Vendor/SitePage";
import VendorDashboardPage from "containers/Vendor/DashboardPage";

import UserDashboardPage from "containers/User/DashboardPage";
import VendorListPage from "containers/User/VendorListPage";

import PrivateRoute from "components/PrivateRoute";
import PublicRoute from "components/PublicRoute";
import NotFoundPage from "components/NotFoundPage";
import SnackbarProvider from "utils/snackbarProvider";

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

  return (
    <ThemeProvider theme={getTheme(darkMode)}>
      <SnackbarProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <BrowserRouter>
            <CssBaseline />
            <Switch key="routes">
              <PublicRoute path="/login" component={LoginPage} exact />
              <PublicRoute path="/register" component={RegisterPage} exact />
              <Route path="/set-password" component={SetPasswordPage} exact />
              <PrivateRoute
                exact
                path="/"
                component={{
                  Admin: AdminDashboardPage,
                  Vendor: VendorDashboardPage,
                  User: UserDashboardPage
                }}
              />
              <PrivateRoute path="/profile" component={ProfilePage} />
              <PrivateRoute
                exact
                path="/vendor"
                component={{
                  Admin: VendorListPage,
                  User: VendorListPage
                }}
              />

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

              <PrivateRoute
                path="/schedule"
                component={{
                  Vendor: VendorSchedulePage
                }}
              />
              <PrivateRoute
                path="/vendor/:vendorId/schedule"
                component={{
                  Admin: VendorSchedulePage
                }}
              />

              <PrivateRoute
                path="/site"
                component={{
                  Vendor: VendorSitePage
                }}
              />
              <PrivateRoute
                path="/vendor/:vendorId/site"
                component={{
                  Admin: VendorSitePage,
                  User: VendorSitePage
                }}
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
