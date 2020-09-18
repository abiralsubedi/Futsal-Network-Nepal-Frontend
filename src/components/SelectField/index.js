import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import Autocomplete from "@material-ui/lab/Autocomplete";

import useStyles from "./style";

const SelectField = ({
  handleChange,
  isLoading,
  label,
  required,
  autoFocus,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Autocomplete
      id={label}
      autoComplete
      filterSelectedOptions
      limitTags={3}
      loading={isLoading}
      onChange={(e, option) => handleChange(option)}
      {...rest}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          className={classes.primaryField}
          required={required}
          autoFocus={autoFocus}
          InputProps={{
            ...params.InputProps,
            classes: {
              input: classes.input
            },
            endAdornment: (
              <React.Fragment>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
};

SelectField.propTypes = {
  isLoading: PropTypes.bool,
  handleChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool
};

export default SelectField;
