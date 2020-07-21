import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

import { Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";

import AuthenticationWrapper from "components/AuthenticationWrapper";
import TextField from "components/TextField";
import Button from "components/Button";
import { OuterLogo } from "components/Common";
import { ThemeContext } from "context/themeContext";

import checkValidEmail from "utils/checkValidEmail";

import { register, clearRegisterMessage } from "./actions";
import useStyles from "./style";

const RegisterPage = props => {
  const { isAuthenticated, profile } = props.data;
  const {
    history,
    registerData: { registerError, registerSuccess, registerLoading },
    onClearRegisterMessage,
    postRegister
  } = props;

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [location, setLocation] = useState("");

  const { isMobile } = useContext(ThemeContext);

  useEffect(() => {
    if (registerError) {
      enqueueSnackbar(registerError, {
        variant: "error",
        onClose: () => onClearRegisterMessage()
      });
    }

    if (registerSuccess) {
      enqueueSnackbar("You will shortly receive email to set password.", {
        variant: "success",
        onClose: () => onClearRegisterMessage()
      });
      setFullName("");
      setEmailAddress("");
      setLocation("");
    }
  }, [registerError, registerSuccess]);

  if (isAuthenticated && profile) {
    history.push("/");
  }

  const onSubmitRegister = () => {
    if (!checkValidEmail(emailAddress)) {
      return enqueueSnackbar("Email is invalid", {
        variant: "error",
        onClose: () => onClearRegisterMessage()
      });
    }
    postRegister({ fullName, emailAddress, location });
  };

  return (
    <AuthenticationWrapper>
      <div className={classes.content}>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmitRegister();
          }}
        >
          {isMobile && <OuterLogo />}
          <Typography variant="h6">Create your account</Typography>
          <TextField
            id="full-name"
            label="Full Name"
            value={fullName}
            handleChange={val => setFullName(val)}
            autoFocus
            required
            fullWidth
            customClasses={classes.loginTextField}
          />
          <TextField
            id="email-address"
            label="Email"
            type="email"
            value={emailAddress}
            handleChange={val => setEmailAddress(val)}
            required
            fullWidth
            customClasses={classes.loginTextField}
          />
          <TextField
            id="location"
            label="Location"
            value={location}
            handleChange={val => setLocation(val)}
            required
            fullWidth
            customClasses={classes.loginTextField}
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            type="submit"
            fullWidth
            disabled={registerLoading}
            actionLoading={registerLoading}
            buttonText="SIGN UP NOW"
          />
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ marginTop: "1rem" }}
          >
            Already have an account?{" "}
            <Link to="/login" className={classes.textLink}>
              Sign in
            </Link>
          </Typography>
        </form>
      </div>
    </AuthenticationWrapper>
  );
};

RegisterPage.propTypes = {
  data: PropTypes.object,
  registerData: PropTypes.object,
  postRegister: PropTypes.func,
  onClearRegisterMessage: PropTypes.func
};

const mapStateToProps = state => ({
  data: state.LoginReducer,
  registerData: state.RegisterReducer
});

const mapDispatchToProps = dispatch => ({
  postRegister: credential => dispatch(register(credential)),
  onClearRegisterMessage: () => dispatch(clearRegisterMessage())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(RegisterPage);
