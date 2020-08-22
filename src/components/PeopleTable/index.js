import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import useStyles from "./style";

const PeopleTable = ({
  buttonRootClass,
  buttonLabelClass,
  circularRootClass,
  buttonText,
  actionLoading,
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
      disableFocusRipple
      disableRipple
      {...rest}
    >
      {actionLoading && (
        <CircularProgress
          color="inherit"
          size="1.25rem"
          classes={{ root: `${classes.circularRoot} ${circularRootClass}` }}
        />
      )}
      {buttonText}
      {children}
    </Button>
  );
};

PeopleTable.propTypes = {
  buttonRootClass: PropTypes.string,
  buttonLabelClass: PropTypes.string,
  circularRootClass: PropTypes.string,
  buttonText: PropTypes.string,
  actionLoading: PropTypes.bool,
  children: PropTypes.node
};

export default PeopleTable;
