import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import { IOSSwitch } from "components/Common";
import Switch from "@material-ui/core/Switch";
import Modal from "components/Modal";
import Button from "components/Button";
import TextField from "components/TextField";

import useStyles from "./style";

const AddFieldModal = ({
  open,
  handleClose,
  addFieldData,
  handleSubmit,
  loading
}) => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(false);

  const { _id: fieldId } = addFieldData;

  useEffect(() => {
    if (addFieldData) {
      const { name, disabled } = addFieldData;
      setName(name || "");
      setDisabled(disabled || false);
    }
  }, [addFieldData]);

  const switchMemo = useMemo(
    () => (
      <FormControlLabel
        label="Disable Field:"
        labelPlacement="start"
        classes={{
          label: classes.controlLabel,
          root: classes.controlLabelRoot
        }}
        control={
          <IOSSwitch
            checked={disabled}
            name="field-switch"
            onChange={({ target }) => setDisabled(target.checked)}
          />
        }
      />
    ),
    [disabled]
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={`${fieldId ? "Edit" : "Add"} Field`}
    >
      <div className={classes.addFieldContent}>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit({ name, fieldId, disabled });
          }}
        >
          <TextField
            id="field-name"
            label="Field Name"
            value={name}
            handleChange={val => setName(val)}
            required
            fullWidth
            customClasses={classes.addFieldName}
          />
          <div>{switchMemo}</div>

          <Button
            size="large"
            color="primary"
            fullWidth
            buttonRootClass={classes.addFieldButtonRoot}
            type="submit"
            buttonText="Save"
            variant="contained"
            actionLoading={loading}
            disabled={loading}
          />
        </form>
      </div>
    </Modal>
  );
};

AddFieldModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  addFieldData: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  handleSubmit: PropTypes.func,
  loading: PropTypes.bool
};

export default AddFieldModal;
