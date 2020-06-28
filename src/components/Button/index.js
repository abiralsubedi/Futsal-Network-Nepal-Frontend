import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

import useStyles from "./style";

const CustomButton = ({
  buttonRootClass,
  buttonLabelClass,
  children,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Button
      classes={{
        root: `${classes.buttonRoot} ${buttonRootClass}`,
        label: `${classes.buttonLabel} ${buttonLabelClass}`
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  buttonRootClass: PropTypes.string,
  buttonLabelClass: PropTypes.string,
  children: PropTypes.node
};

export default CustomButton;
