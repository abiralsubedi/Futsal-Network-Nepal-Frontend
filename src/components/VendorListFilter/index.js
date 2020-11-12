import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import Button from "components/Button";
import TextField from "components/TextField";
import Modal from "components/Modal";

import { ThemeContext } from "context/themeContext";

import useStyles from "./style";

const VendorListFilter = ({
  handleSearch,
  location,
  loading,
  initialFilterOptions
}) => {
  const classes = useStyles();
  const { isMobile } = useContext(ThemeContext);

  const distanceMarks = [
    {
      value: 0,
      label: "All"
    },
    {
      value: 50,
      label: "50 km"
    }
  ];

  const ratingMarks = [
    {
      value: 0,
      label: "0"
    },
    {
      value: 5,
      label: "5"
    }
  ];

  const [vendorName, setVendorName] = useState("");
  const [radius, setRadius] = useState(0);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [filterModal, setFilterModal] = useState(false);

  useEffect(() => {
    if (initialFilterOptions) {
      const { vendorName, radius, ratingRange } = initialFilterOptions;
      setVendorName(vendorName);
      setRadius(radius);
      setRatingRange(ratingRange);
    } else {
      makeSearch();
    }
  }, []);

  const getDistanceLabel = value => {
    if (value && value > 0) {
      return value;
    }
    return "All";
  };

  const resetSearch = () => {
    setVendorName("");
    setRadius(0);
    setRatingRange([0, 5]);
    setFilterModal(false);
    handleSearch({ vendorName: "", radius: 0, ratingRange: [0, 5] });
  };

  const makeSearch = () => {
    setFilterModal(false);
    handleSearch({ vendorName, radius, ratingRange });
  };

  const filterForm = () => {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          makeSearch();
        }}
      >
        <TextField
          id="futsal-name"
          label="Futsal Name"
          value={vendorName}
          handleChange={val => setVendorName(val)}
          autoFocus
          fullWidth
        />
        <Typography gutterBottom className={classes.fieldTitle}>
          Rating Range:
        </Typography>
        <Slider
          aria-labelledby="rating-slider"
          step={1}
          max={5}
          value={ratingRange}
          onChange={(e, val) => setRatingRange(val)}
          valueLabelDisplay="auto"
          marks={ratingMarks}
        />
        {location && (
          <>
            <Typography gutterBottom className={classes.fieldTitle}>
              Radius (km):
            </Typography>
            <Slider
              aria-labelledby="distance-slider"
              step={5}
              max={50}
              value={radius}
              onChange={(e, val) => setRadius(val)}
              valueLabelDisplay="auto"
              marks={distanceMarks}
              valueLabelFormat={getDistanceLabel}
            />
          </>
        )}
        <Button
          variant="contained"
          color="primary"
          buttonRootClass={classes.vendorListSearchButton}
          buttonText="Search"
          type="submit"
          disabled={loading}
        />
        <Button
          variant="contained"
          color="primary"
          buttonRootClass={classes.vendorListSearchButton}
          buttonText="Reset"
          onClick={resetSearch}
          disabled={loading}
        />
      </form>
    );
  };

  return (
    <div>
      <Modal
        open={filterModal}
        handleClose={() => setFilterModal(false)}
        title="Apply Filter"
        contentWrapperClass={classes.filterModalContent}
      >
        {filterForm()}
      </Modal>
      {isMobile ? (
        <Button
          variant="outlined"
          color="primary"
          buttonText="Apply Filter"
          onClick={() => setFilterModal(true)}
          fullWidth
        />
      ) : (
        <Card>
          <div className={classes.filterFormContent}>
            <Typography gutterBottom className={classes.pageTitle} variant="h5">
              Apply Filter
            </Typography>
            {filterForm()}
          </div>
        </Card>
      )}
    </div>
  );
};

VendorListFilter.propTypes = {
  handleSearch: PropTypes.func,
  location: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  loading: PropTypes.bool,
  initialFilterOptions: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
};

export default VendorListFilter;
