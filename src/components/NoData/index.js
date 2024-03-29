import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

import useStyles from "./style";

const NoData = ({ wrapperClass, text }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.noDataWrapper} ${wrapperClass}`}>
      <Typography className={classes.noDataText}>{text}</Typography>
    </div>
  );
};

NoData.propTypes = {
  text: PropTypes.string,
  wrapperClass: PropTypes.string
};

export default NoData;
