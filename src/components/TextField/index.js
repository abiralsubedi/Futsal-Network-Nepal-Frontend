import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";

import useStyles from "./style";

const CustomTextField = ({
  customClasses,
  type,
  handleChange,
  endAdornment,
  maxDecimalValue = 0,
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
      onChange={({ target: { value } }) => {
        let updatedVal = value;
        if (type === "number" && +value % 1 !== 0) {
          const decimalIndex = updatedVal.indexOf(".");
          updatedVal =
            updatedVal.substr(0, decimalIndex) +
            updatedVal.substr(decimalIndex, maxDecimalValue + 1);

          updatedVal = Math.abs(+updatedVal);
        }
        handleChange(updatedVal);
      }}
      className={`${customClasses} ${classes.primaryField}`}
      {...rest}
    />
  );
};

CustomTextField.propTypes = {
  customClasses: PropTypes.string,
  type: PropTypes.string,
  maxDecimalValue: PropTypes.number,
  handleChange: PropTypes.func,
  endAdornment: PropTypes.node
};

export default CustomTextField;
