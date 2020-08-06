import React from "react";
// import PropTypes from "prop-types";
import { format } from "date-fns";

import { DatePicker } from "@material-ui/pickers";

import useStyles from "./style";

const CustomDatePicker = ({ ...rest }) => {
  const classes = useStyles();
  return (
    <DatePicker
      labelFunc={(date, invalidLabel) => {
        if (invalidLabel) {
          return invalidLabel;
        }
        return format(new Date(date), "MMM d, yyyy");
      }}
      {...rest}
    />
  );
};

CustomDatePicker.propTypes = {};

export default CustomDatePicker;
