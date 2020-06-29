import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextField from "components/TextField";
import Button from "components/Button";
import { useSnackbar } from "notistack";

import { postPassword, clearMessage } from "./actions";
import useStyles from "./style";

const ChangePassword = ({
  savePassword,
  changePasswordData,
  onClearInformationMessage
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const {
    postPasswordLoading,
    postPasswordSuccess,
    postPasswordError
  } = changePasswordData;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    if (postPasswordError) {
      enqueueSnackbar(postPasswordError, {
        variant: "error",
        onClose: () => onClearInformationMessage()
      });
    }
    if (postPasswordSuccess) {
      enqueueSnackbar(postPasswordSuccess, {
        variant: "success",
        onClose: () => onClearInformationMessage()
      });
    }
  }, [postPasswordError, postPasswordSuccess]);

  return (
    <div className={classes.basicInformationContent}>
      <form
        onSubmit={e => {
          e.preventDefault();
          savePassword({ oldPassword, newPassword });
        }}
      >
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField
              id="old-password"
              label="Old Password"
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              handleChange={val => setOldPassword(val)}
              autoFocus
              required
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowOldPassword(prevState => !prevState)}
                    edge="end"
                  >
                    {showOldPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              id="new-password"
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              handleChange={val => setNewPassword(val)}
              required
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowNewPassword(prevState => !prevState)}
                    edge="end"
                  >
                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          size="large"
          color="primary"
          type="submit"
          fullWidth
          disabled={postPasswordLoading}
          buttonRootClass={classes.passwordButtonRoot}
        >
          {postPasswordLoading && (
            <CircularProgress
              color="inherit"
              size="1.25rem"
              classes={{ root: classes.circularRoot }}
            />
          )}
          Save Changes
        </Button>
      </form>
    </div>
  );
};

ChangePassword.propTypes = {
  changePasswordData: PropTypes.object,
  savePassword: PropTypes.func,
  onClearInformationMessage: PropTypes.func
};

const mapStateToProps = state => ({
  changePasswordData: state.ChangePasswordReducer
});

const mapDispatchToProps = dispatch => ({
  savePassword: data => dispatch(postPassword(data)),
  onClearInformationMessage: () => dispatch(clearMessage())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ChangePassword);
