import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { useSnackbar } from "notistack";

import PeopleTable from "components/PeopleTable";
import AddFieldModal from "components/AddFieldModal";

import { getFieldInfo, postFieldInfo, clearFieldData } from "./actions";
import useStyles from "./style";

const FieldsPage = ({
  fetchFieldInfo,
  saveFieldInfo,
  onClearFieldData,
  globalData: { profile },
  fieldInfoData,
  match
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const {
    fieldInfoLoading,
    fieldInfo,
    postFieldInfoLoading,
    postFieldInfoSuccess,
    postFieldInfoError
  } = fieldInfoData;

  const [addFieldData, setAddFieldData] = useState(false);

  const vendorId = match.params.vendorId || profile._id;

  useEffect(() => {
    fetchFieldInfo({ vendorId });
  }, []);

  useEffect(() => {
    if (postFieldInfoError) {
      enqueueSnackbar(postFieldInfoError, {
        variant: "error",
        onClose: () => onClearFieldData()
      });
    }
    if (postFieldInfoSuccess) {
      enqueueSnackbar(postFieldInfoSuccess, {
        variant: "success",
        onClose: () => onClearFieldData()
      });
      setAddFieldData(false);
      fetchFieldInfo({ vendorId });
    }
  }, [postFieldInfoError, postFieldInfoSuccess]);

  const tableHeader = [
    { label: "Field Name", key: "name" },
    { label: "Status", key: "disabled", type: "Bool" }
  ];

  const actions = [
    { type: "Edit", handleClick: item => setAddFieldData(item) }
  ];
  const addButton = {
    label: "Add Field",
    handleClick: () => setAddFieldData({})
  };

  const fieldTableMemo = useMemo(() => {
    return (
      <PeopleTable
        type="field"
        tableHeader={tableHeader}
        tableBody={fieldInfo || []}
        tableBodyLoading={fieldInfoLoading}
        actions={actions}
        addButton={addButton}
        noMultiSelect
      />
    );
  }, [fieldInfoLoading]);

  return (
    <div className={classes.GameHourContent}>
      <AddFieldModal
        open={!!addFieldData}
        handleClose={() => setAddFieldData(false)}
        addFieldData={addFieldData}
        handleSubmit={data => saveFieldInfo({ ...data, vendorId })}
        loading={postFieldInfoLoading}
      />
      {fieldTableMemo}
    </div>
  );
};

FieldsPage.propTypes = {
  fetchFieldInfo: PropTypes.func,
  onClearFieldData: PropTypes.func,
  saveFieldInfo: PropTypes.func,
  fieldInfoData: PropTypes.object,
  match: PropTypes.object
};

const mapStateToProps = state => ({
  fieldInfoData: state.FieldReducer,
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({
  fetchFieldInfo: data => dispatch(getFieldInfo(data)),
  onClearFieldData: () => dispatch(clearFieldData()),
  saveFieldInfo: data => dispatch(postFieldInfo(data))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(FieldsPage);
