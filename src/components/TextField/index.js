import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";

import useStyles from "./style";

const CustomTextField = ({
  customClasses,
  type,
  handleChange,
  endAdornment,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <TextField
      InputProps={{
        classes: {
          input: classes.input
        },
        endAdornment: endAdornment ? endAdornment : ""
      }}
      variant="outlined"
      type={type || "text"}
      onChange={({ target: { value } }) => handleChange(value)}
      className={`${customClasses} ${classes.primaryField}`}
      {...rest}
    />
  );
};

CustomTextField.propTypes = {
  customClasses: PropTypes.string,
  type: PropTypes.string,
  handleChange: PropTypes.func,
  endAdornment: PropTypes.node
};

export default CustomTextField;
