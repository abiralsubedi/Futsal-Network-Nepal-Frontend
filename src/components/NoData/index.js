import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

import useStyles from "./style";

const Loader = ({ wrapperClass, text, ...rest }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.noDataWrapper} ${wrapperClass}`}>
      <Typography color="textSecondary" className={classes.noDataText}>
        {text}
      </Typography>
    </div>
  );
};

Loader.propTypes = {
  text: PropTypes.string,
  wrapperClass: PropTypes.string,
  circularRootClass: PropTypes.string
};

export default Loader;
