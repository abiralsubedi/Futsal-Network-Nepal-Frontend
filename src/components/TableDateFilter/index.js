import React from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Button from "components/Button";
import DatePicker from "components/DatePicker";

import useStyles from "./style";

const TableDateFilter = ({ handleSearch, contentLoading, dateField }) => {
  const classes = useStyles();

  const getPickerField = () => {
    const pickerField = (
      dateField || []
    ).map(({ label, value, handleChange, ...rest }) => (
      <DatePicker
        key={label}
        label={label}
        value={value}
        onChange={handleChange}
        autoOk
        {...rest}
      />
    ));

    if (pickerField.length === 2) {
      const middleItem = (
        <Typography className={classes.dateDivider} key="middleware">
          to
        </Typography>
      );
      pickerField.splice(1, 0, middleItem);
    }

    return pickerField;
  };

  return (
    <Grid
      container
      spacing={3}
      alignItems="center"
      className={classes.dateFilterWrapper}
    >
      <Grid item>
        <div className={classes.dateRange}>{getPickerField()}</div>
      </Grid>
      <Grid item xs={6} md={4}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          fullWidth
          disabled={contentLoading}
          onClick={handleSearch}
          buttonRootClass={classes.filterButtonRoot}
          buttonText="Search"
        />
      </Grid>
    </Grid>
  );
};

TableDateFilter.propTypes = {
  handleSearch: PropTypes.func,
  contentLoading: PropTypes.bool,
  dateField: PropTypes.instanceOf(Array)
};

export default TableDateFilter;
