import React, { useContext } from "react";
import PropTypes from "prop-types";

import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Brightness4Icon from "@material-ui/icons/Brightness4";

import { ThemeContext } from "context/themeContext";

import { OuterLogo, IOSSwitch } from "components/Common";

import useStyles from "./style";
import { Typography } from "@material-ui/core";

const AuthenticationWrapper = ({ children }) => {
  const classes = useStyles();

  const { darkMode, setDarkMode, isMobile } = useContext(ThemeContext);

  return (
    <Paper className={classes.authenticationWrapper}>
      {!isMobile && (
        <div className={classes.appScreen}>
          <OuterLogo />
          <div className={classes.appContent}>
            <Typography variant="h5">
              Welcome to Futsal Network Nepal App!
            </Typography>
            <Typography variant="body1">
              Here you are able to search, review and book the most suitable
              futsal around you.
            </Typography>
            <Typography variant="p">- Abiral Subedi</Typography>
          </div>
        </div>
      )}
      <div className={classes.loginScreen}>
        <Card className={classes.authenticationSetting} elevation={3}>
          <Button
            classes={{ label: classes.settingButtonLabel }}
            onClick={() => {
              setDarkMode((prev) => !prev);
              localStorage.setItem("darkMode", !darkMode);
            }}
            disableFocusRipple
            disableRipple
          >
            <div style={{ display: "flex" }}>
              <Brightness4Icon />
            </div>
            <div>
              <FormControlLabel
                classes={{ root: classes.formControlRoot }}
                control={
                  <IOSSwitch checked={darkMode} name="screen-mode-switch" />
                }
              />
            </div>
          </Button>
        </Card>
        {children}
      </div>
    </Paper>
  );
};

AuthenticationWrapper.propTypes = {
  children: PropTypes.node,
};

export default AuthenticationWrapper;
