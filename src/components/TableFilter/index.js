import React from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";

import Button from "components/Button";
import TextField from "components/TextField";

import useStyles from "./style";

const TableFilter = ({
  textField,
  handleSearch,
  handleReset,
  contentLoading
}) => {
  const classes = useStyles();
  return (
    <form onSubmit={handleSearch}>
      <Grid container spacing={3} alignItems="center">
        {(textField || []).map((item, index) => (
          <Grid item sm={4} xs={12} key={index + 1}>
            <TextField
              id="search-text"
              label="Search by Name"
              value={item.value}
              handleChange={item.handleChange}
              autoFocus={index === 0}
              fullWidth
              size="small"
            />
          </Grid>
        ))}

        <Grid item sm={6} xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={contentLoading}
            buttonRootClass={classes.tableFilterButton}
            buttonText="Search"
            type="submit"
            size="small"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={contentLoading}
            buttonRootClass={classes.tableFilterButton}
            buttonText="Reset"
            onClick={handleReset}
            size="small"
          />
        </Grid>
      </Grid>
    </form>
  );
};

TableFilter.propTypes = {
  textField: PropTypes.instanceOf(Array),
  handleSearch: PropTypes.func,
  handleReset: PropTypes.func,
  contentLoading: PropTypes.bool
};

export default TableFilter;
