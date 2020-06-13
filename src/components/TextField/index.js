import useStyles from "./style";
import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

const CustomTextField = ({
  customClasses,
  error,
  id,
  label,
  helperText,
  type,
  value,
  handleChange,
  autoFocus,
  required,
  fullWidth,
  endAdornment
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
      autoComplete="new-password"
      error={error}
      id={id}
      label={label}
      helperText={helperText}
      variant="outlined"
      type={type || "text"}
      value={value}
      onChange={({ target: { value } }) => handleChange(value)}
      className={`${customClasses} ${classes.primaryField}`}
      autoFocus={autoFocus}
      required={required}
      fullWidth={fullWidth}
    />
  );
};

CustomTextField.propTypes = {
  customClasses: PropTypes.string,
  error: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  endAdornment: PropTypes.node
};

export default CustomTextField;
