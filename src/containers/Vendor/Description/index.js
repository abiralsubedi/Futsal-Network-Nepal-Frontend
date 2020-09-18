import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { useSnackbar } from "notistack";

import PeopleTable from "components/PeopleTable";
import AddFieldModal from "components/AddFieldModal";

import {
  getDescriptionInfo,
  postDescriptionInfo,
  clearDescriptionData
} from "./actions";
import useStyles from "./style";

const DescriptionPage = ({
  fetchDescriptionInfo,
  saveDescriptionInfo,
  onClearDescriptionData,
  globalData: { profile },
  descriptionInfoData,
  match
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const {
    descriptionInfoLoading,
    descriptionInfo,
    postDescriptionInfoLoading,
    postDescriptionInfoSuccess,
    postDescriptionInfoError
  } = descriptionInfoData;

  const [addFieldData, setAddFieldData] = useState(false);

  const vendorId = match.params.vendorId || profile._id;

  useEffect(() => {
    fetchDescriptionInfo({ vendorId });
  }, []);

  useEffect(() => {
    if (postDescriptionInfoError) {
      enqueueSnackbar(postDescriptionInfoError, {
        variant: "error",
        onClose: () => onClearDescriptionData()
      });
    }
    if (postDescriptionInfoSuccess) {
      enqueueSnackbar(postDescriptionInfoSuccess, {
        variant: "success",
        onClose: () => onClearDescriptionData()
      });
      setAddFieldData(false);
      fetchDescriptionInfo({ vendorId });
    }
  }, [postDescriptionInfoError, postDescriptionInfoSuccess]);

  return (
    <div className={classes.GameHourContent}>
      <AddFieldModal
        open={!!addFieldData}
        handleClose={() => setAddFieldData(false)}
        addFieldData={addFieldData}
        handleSubmit={data => saveDescriptionInfo({ ...data, vendorId })}
        loading={postDescriptionInfoLoading}
      />
      Hello
    </div>
  );
};

DescriptionPage.propTypes = {
  fetchDescriptionInfo: PropTypes.func,
  onClearDescriptionData: PropTypes.func,
  saveDescriptionInfo: PropTypes.func,
  descriptionInfoData: PropTypes.object,
  match: PropTypes.object
};

const mapStateToProps = state => ({
  descriptionInfoData: state.DescriptionReducer,
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({
  fetchDescriptionInfo: data => dispatch(getDescriptionInfo(data)),
  onClearDescriptionData: () => dispatch(clearDescriptionData()),
  saveDescriptionInfo: data => dispatch(postDescriptionInfo(data))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(DescriptionPage);
