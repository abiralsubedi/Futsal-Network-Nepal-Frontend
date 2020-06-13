import useStyles from "./style";
import React from "react";
import { Paper } from "@material-ui/core";

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
        ...(style || {})
      }}
    >
      {children}
    </Paper>
  );
};
