import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import { Typography, InputAdornment, IconButton } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import AuthenticationWrapper from "components/AuthenticationWrapper";
import TextField from "components/TextField";
import Button from "components/Button";
import { OuterLogo } from "components/Common";
import { ThemeContext } from "context/themeContext";

import { setPassword, clearSetPasswordMessage } from "./actions";
import useStyles from "./style";

const SetPasswordPage = ({
  history,
  location,
  setPasswordData: { setPasswordError, setPasswordSuccess, setPasswordLoading },
  onClearPasswordMessage,
  onPostPassword
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { isMobile } = useContext(ThemeContext);

  useEffect(() => {
    if (setPasswordError) {
      enqueueSnackbar(setPasswordError, {
        variant: "error",
        onClose: () => onClearPasswordMessage()
      });
    }

    if (setPasswordSuccess) {
      enqueueSnackbar("Your password has been successfully updated.", {
        variant: "success",
        onClose: () => onClearPasswordMessage()
      });
      history.push("/login");
    }
  }, [setPasswordError, setPasswordSuccess]);

  useEffect(() => {
    const parsedQuery = queryString.parse(location.search);
    if (parsedQuery.token) {
      localStorage.setItem("token", parsedQuery.token);
      history.replace("/set-password");
    }

    return () => {
      localStorage.removeItem("token");
    };
  }, []);

  return (
    <AuthenticationWrapper>
      <div className={classes.content}>
        <form
          onSubmit={e => {
            e.preventDefault();
            onPostPassword({ newPassword: password });
          }}
        >
          {isMobile && <OuterLogo />}
          <Typography variant="h6">Set your password</Typography>
          <TextField
            id="set-new-password"
            label="Password"
            value={password}
            handleChange={val => setPassword(val)}
            type={showPassword ? "text" : "password"}
            required
            fullWidth
            customClasses={classes.loginTextField}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(prevState => !prevState)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            type="submit"
            fullWidth
            disabled={setPasswordLoading}
            actionLoading={setPasswordLoading}
            buttonText="Set Password"
          />
        </form>
      </div>
    </AuthenticationWrapper>
  );
};

SetPasswordPage.propTypes = {
  setPasswordData: PropTypes.object,
  onPostPassword: PropTypes.func,
  onClearPasswordMessage: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object
};

const mapStateToProps = state => ({
  setPasswordData: state.SetPasswordPageReducer
});

const mapDispatchToProps = dispatch => ({
  onPostPassword: credential => dispatch(setPassword(credential)),
  onClearPasswordMessage: () => dispatch(clearSetPasswordMessage())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(SetPasswordPage);
