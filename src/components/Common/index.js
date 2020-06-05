import useStyles from "./style";
import React from "react";

export const Wrapper = ({ className, style, children, ...props }) => {
  const classes = useStyles();
  return (
    <div
      {...props}
      className={["container", className || ""].join(" ")}
      style={{
        flex: 1,
        minHeight: "calc(100vh - 19rem)",
        ...(style || {})
      }}
    >
      {children}
    </div>
  );
};
