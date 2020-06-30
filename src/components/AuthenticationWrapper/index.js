import React, { useContext } from "react";
import PropTypes from "prop-types";

import Paper from "@material-ui/core/Paper";

import { ThemeContext } from "context/themeContext";

import { OuterLogo } from "components/Common";

import useStyles from "./style";
import { Typography } from "@material-ui/core";

const AuthenticationWrapper = ({ children }) => {
  const classes = useStyles();

  const { isMobile } = useContext(ThemeContext);

  return (
    <Paper className={classes.authenticationWrapper}>
      {!isMobile && (
        <div className={classes.appScreen}>
          <OuterLogo />
          <div className={classes.appContent}>
            <p>
              <Typography variant="h5">Welcome to the app!</Typography>
            </p>
            <Typography variant="body1">
              Here you are able to create account and surf through many learning
              resources.
            </Typography>
          </div>
        </div>
      )}
      <div className={classes.loginScreen}>{children}</div>
    </Paper>
  );
};

AuthenticationWrapper.propTypes = {
  children: PropTypes.node
};

export default AuthenticationWrapper;
