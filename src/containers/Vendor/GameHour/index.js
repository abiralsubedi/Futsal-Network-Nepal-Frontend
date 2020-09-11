import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";

import Grid from "@material-ui/core/Grid";
import { useSnackbar } from "notistack";

import PeopleTable from "components/PeopleTable";
import SelectField from "components/SelectField";
import AddGameHourModal from "components/AddGameHourModal";

import { getWeekData, getClockData } from "containers/LoginPage/actions";

import {
  getGameHour,
  postGameHour,
  clearGameHourData,
  clearPostData
} from "./actions";
import useStyles from "./style";

const GameHour = ({
  onClearGameHourData,
  fetchGameHour,
  gameHourData,
  fetchWeekData,
  globalData,
  match,
  fetchClockData,
  saveGameHour,
  onClearPostData
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const {
    gameHourLoading,
    gameHour,
    postGameHourError,
    postGameHourSuccess,
    postGameHourLoading
  } = gameHourData;
  const { weekData, weekDataLoading, profile, clockData } = globalData;

  const [weekDay, setWeekDay] = useState(null);
  const [addHourData, setAddHourData] = useState(false);

  const vendorId = match.params.vendorId || profile._id;

  useEffect(() => {
    if (!weekData.length) {
      fetchWeekData();
    }

    if (!clockData.length) {
      fetchClockData();
    }

    return () => {
      onClearGameHourData();
    };
  }, []);

  useEffect(() => {
    if (weekData.length) {
      setWeekDay(weekData[0]);
    }
  }, [weekData]);

  useEffect(() => {
    if (weekDay) {
      fetchGameHour({ dayId: weekDay._id, vendorId });
    }
  }, [weekDay]);

  useEffect(() => {
    if (postGameHourError) {
      enqueueSnackbar(postGameHourError, {
        variant: "error",
        onClose: () => onClearPostData()
      });
    }
    if (postGameHourSuccess) {
      enqueueSnackbar(postGameHourSuccess, {
        variant: "success",
        onClose: () => onClearPostData()
      });
      setAddHourData(false);
      fetchGameHour({ dayId: weekDay._id, vendorId });
    }
  }, [postGameHourError, postGameHourSuccess]);

  const tableHeader = [
    { label: "Game Hour", key: "clock.fullName" },
    { label: "Price($)", key: "price", align: "right" }
  ];

  const actions = [{ type: "Edit", handleClick: item => setAddHourData(item) }];
  const addButton = {
    label: "Add Hour",
    handleClick: () => setAddHourData({})
  };

  const gameHourTableMemo = useMemo(
    () => (
      <PeopleTable
        type="game hour"
        tableHeader={tableHeader}
        tableBody={gameHour || []}
        tableBodyLoading={gameHourLoading}
        pageSize={0}
        searchCount={0}
        currentPage={0}
        actions={actions}
        addButton={addButton}
      />
    ),
    [gameHourLoading]
  );

  return (
    <div className={classes.GameHourContent}>
      <AddGameHourModal
        open={!!addHourData}
        handleClose={() => setAddHourData(false)}
        addHourData={addHourData}
        handleSubmit={data =>
          saveGameHour({ ...data, vendorId, dayId: weekDay._id })
        }
        loading={postGameHourLoading}
      />
      <Grid container spacing={3}>
        <Grid item md={4} sm={6} xs={12}>
          <SelectField
            options={weekData}
            getOptionLabel={option => option.name}
            label="Week day"
            value={weekDay}
            handleChange={opt => setWeekDay(opt)}
            getOptionSelected={(option, value) => option.name === value.name}
            isLoading={weekDataLoading}
            disableClearable
            className={classes.gameHourFilter}
          />
        </Grid>
      </Grid>
      {gameHourTableMemo}
    </div>
  );
};

GameHour.propTypes = {
  fetchGameHour: PropTypes.func,
  fetchWeekData: PropTypes.func,
  onClearGameHourData: PropTypes.func,
  gameHourData: PropTypes.object,
  globalData: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  fetchClockData: PropTypes.func,
  saveGameHour: PropTypes.func,
  onClearPostData: PropTypes.func
};

const mapStateToProps = state => ({
  gameHourData: state.GameHourReducer,
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({
  fetchGameHour: data => dispatch(getGameHour(data)),
  onClearGameHourData: () => dispatch(clearGameHourData()),
  onClearPostData: () => dispatch(clearPostData()),
  fetchWeekData: () => dispatch(getWeekData()),
  fetchClockData: () => dispatch(getClockData()),
  saveGameHour: data => dispatch(postGameHour(data))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(GameHour);
