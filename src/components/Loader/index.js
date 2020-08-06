import React from "react";
import PropTypes from "prop-types";

import CircularProgress from "@material-ui/core/CircularProgress";

import useStyles from "./style";

const Loader = ({ wrapperClass, circularRootClass, ...rest }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.circularWrapper} ${wrapperClass}`}>
      <CircularProgress
        color="primary"
        size="2.75rem"
        classes={{
          root: `${circularRootClass}`
        }}
        {...rest}
      />
    </div>
  );
};

Loader.propTypes = {
  wrapperClass: PropTypes.string,
  circularRootClass: PropTypes.string
};

export default Loader;
