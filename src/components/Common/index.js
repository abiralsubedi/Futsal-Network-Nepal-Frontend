import useStyles from "./style";
import React from "react";
import { Paper } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";

export const Wrapper = ({ className, style, children, ...props }) => {
  const classes = useStyles();
  return (
    <Paper
      elevation={0}
      square
      {...props}
      className={["container", classes.random, className || ""].join(" ")}
      style={{
        flex: 1,
        minHeight: "calc(100vh - 19rem)",
        padding: "20px 24px",
        ...(style || {})
      }}
    >
      {children}
    </Paper>
  );
};

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
    backgroundColor: theme.palette.grey[50],
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
