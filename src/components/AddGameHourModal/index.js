import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import Typography from "@material-ui/core/Typography";

import Modal from "components/Modal";
import Button from "components/Button";
import TextField from "components/TextField";
import SelectField from "components/SelectField";

import useStyles from "./style";

const AddGameHourModal = ({
  open,
  handleClose,
  globalData,
  addHourData,
  handleSubmit,
  loading
}) => {
  const classes = useStyles();

  const { clockData, clockDataLoading } = globalData;
  const [gameHour, setGameHour] = useState(null);
  const [price, setPrice] = useState(0);

  const { _id: gameHourId } = addHourData;

  useEffect(() => {
    if (addHourData) {
      const { clock, price } = addHourData;
      setGameHour(clock || null);
      setPrice(price || 0);
    }
  }, [addHourData]);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={`${gameHourId ? "Edit" : "Add"} Game Hour`}
    >
      <div className={classes.addHourContent}>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit({ gameHour, price, gameHourId });
          }}
        >
          <SelectField
            options={clockData}
            getOptionLabel={option => option.fullName}
            label="Game Hour"
            value={gameHour}
            handleChange={opt => setGameHour(opt)}
            getOptionSelected={(option, value) => option.name === value.name}
            isLoading={clockDataLoading}
            disableClearable
            className={classes.gameHourFilter}
            required
          />

          <TextField
            id="price"
            label="Hourly Price ($)"
            value={price}
            handleChange={val => setPrice(val)}
            required
            type="number"
            maxDecimalValue={2}
            fullWidth
            customClasses={classes.addPriceField}
          />

          <Button
            size="large"
            color="primary"
            fullWidth
            buttonRootClass={classes.addHourButtonRoot}
            type="submit"
            buttonText="Save"
            variant="contained"
            loading={loading}
            disabled={loading}
          />
        </form>
      </div>
    </Modal>
  );
};

AddGameHourModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  globalData: PropTypes.object,
  addHourData: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  handleSubmit: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  globalData: state.LoginReducer
});

// const mapDispatchToProps = dispatch => ({});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(AddGameHourModal);
