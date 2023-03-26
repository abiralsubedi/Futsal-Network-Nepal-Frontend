import React from "react";
import { Link } from "react-router-dom";

import { Paper } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

import useStyles from "./style";

export const Wrapper = ({ style, children, ...props }) => {
  const classes = useStyles();
  return (
    <Paper
      elevation={0}
      square
      {...props}
      classes={{
        root: classes.paperRoot
      }}
      style={{
        flex: 1,
        minHeight: "calc(100vh - 95px)",
        ...(style || {})
      }}
    >
      <div className={classes.paperRootContainer}>{children}</div>
    </Paper>
  );
};

export const OuterLogo = () => {
  return (
    <Link to="/login">
      <img
        src="https://fyp-app-assets.s3.amazonaws.com/images/app-logo.png"
        alt="logo"
        style={{ width: "5rem", paddingBottom: "2rem" }}
      />
    </Link>
  );
};

export const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 8,
    borderRadius: 5
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700]
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff"
  }
}))(LinearProgress);

export const IOSSwitch = withStyles(theme => ({
  root: {
    width: 50,
    height: 26,
    padding: 0,
    margin: theme.spacing(1)
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(23px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: "none"
      }
    },
    "&$focusVisible $thumb": {
      color: theme.palette.primary.main,
      border: "6px solid #fff"
    }
  },
  thumb: {
    width: 24,
    height: 24
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    // backgroundColor: theme.palette.grey[50],
    background: "inherit",
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"])
  },
  checked: {},
  focusVisible: {}
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      {...props}
    />
  );
});
