import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";

import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useSnackbar } from "notistack";

import PeopleTable from "components/PeopleTable";
import SelectField from "components/SelectField";
import AddGameHourModal from "components/AddGameHourModal";
import ConfirmationModal from "components/ConfirmationModal";

import { getWeekData, getClockData } from "containers/LoginPage/actions";

import {
  getGameHour,
  postGameHour,
  removeGameHour,
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
  onClearPostData,
  onRemoveGameHour
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const {
    gameHourLoading,
    gameHour,
    postGameHourError,
    postGameHourSuccess,
    postGameHourLoading,
    removeGameHourLoading,
    removeGameHourSuccess,
    removeGameHourError
  } = gameHourData;
  const { weekData, weekDataLoading, profile, clockData } = globalData;

  const [weekDay, setWeekDay] = useState(null);
  const [addHourData, setAddHourData] = useState(false);
  const [removeHourData, setRemoveHourData] = useState(false);

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
    if (postGameHourError || removeGameHourError) {
      enqueueSnackbar(postGameHourError || removeGameHourError, {
        variant: "error",
        onClose: () => onClearPostData()
      });
    }
    if (postGameHourSuccess || removeGameHourSuccess) {
      enqueueSnackbar(postGameHourSuccess || removeGameHourSuccess, {
        variant: "success",
        onClose: () => onClearPostData()
      });
      setAddHourData(false);
      setRemoveHourData(false);
      fetchGameHour({ dayId: weekDay._id, vendorId });
    }
  }, [
    postGameHourError,
    postGameHourSuccess,
    removeGameHourError,
    removeGameHourSuccess
  ]);

  const tableHeader = [
    { label: "Game Hour", key: "clock.fullName" },
    { label: "Price($)", key: "price", align: "right" },
    { label: "Status", key: "disabled", type: "Bool" }
  ];

  const actions = [{ type: "Edit", handleClick: item => setAddHourData(item) }];
  const addButton = {
    label: "Add Hour",
    handleClick: () => setAddHourData({})
  };
  const selectedActions = [
    {
      type: "Disable",
      handleClick: items => setRemoveHourData(items)
    }
  ];

  const gameHourTableMemo = useMemo(() => {
    return (
      <PeopleTable
        type="game hour"
        tableHeader={tableHeader}
        tableBody={gameHour || []}
        tableBodyLoading={gameHourLoading || weekDataLoading}
        actions={actions}
        addButton={addButton}
        selectedActions={selectedActions}
      />
    );
  }, [gameHourLoading, weekDataLoading]);

  const removeHourContentMemo = useMemo(
    () => (
      <List>
        {(removeHourData || [])
          .sort((a, b) => a.clock.clockNo - b.clock.clockNo)
          .map(item => (
            <ListItem key={item._id}>
              <ListItemText primary={item.clock.fullName} />
            </ListItem>
          ))}
      </List>
    ),
    [removeHourData]
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
      <ConfirmationModal
        open={!!removeHourData}
        handleClose={() => setRemoveHourData(false)}
        title="Disable Game Hour"
        confirmationText="Are you sure you want to disable following game hours?"
        confirmationBody={removeHourContentMemo}
        handleConfirm={() =>
          onRemoveGameHour({ gameHours: removeHourData, vendorId })
        }
        loading={removeGameHourLoading}
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
  onClearPostData: PropTypes.func,
  onRemoveGameHour: PropTypes.func
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
  saveGameHour: data => dispatch(postGameHour(data)),
  onRemoveGameHour: data => dispatch(removeGameHour(data))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(GameHour);
