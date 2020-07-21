import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import queryString from "query-string";
import { Link, withRouter } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useSnackbar } from "notistack";

import { ThemeContext } from "context/themeContext";

import { OuterLogo } from "components/Common";
import Button from "components/Button";
import AuthenticationWrapper from "components/AuthenticationWrapper";
import TextField from "components/TextField";
import Modal from "components/Modal";

import checkValidEmail from "utils/checkValidEmail";

import {
  login,
  clearLoginMessage,
  getProfileInfo,
  postForgotPassword
} from "./actions";
import useStyles from "./style";

const LoginPage = ({
  history,
  data,
  location,
  postLogin,
  onClearLoginMessage,
  fetchProfileInfo,
  saveForgotPassword
}) => {
  const {
    isAuthenticated,
    isLoading,
    loginError,
    profile,
    postForgotPasswordLoading,
    postForgotPasswordSuccess,
    postForgotPasswordError
  } = data;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { isMobile } = useContext(ThemeContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [loginGoogleActive, setLoginGoogleActive] = useState(false);
  const [forgotPasswordActive, setForgotPasswordActive] = useState(false);

  useEffect(() => {
    if (loginError) {
      enqueueSnackbar(loginError, {
        variant: "error",
        onClose: () => onClearLoginMessage()
      });
    }
    if (postForgotPasswordError) {
      enqueueSnackbar(postForgotPasswordError, {
        variant: "error",
        onClose: () => onClearLoginMessage()
      });
    }
    if (postForgotPasswordSuccess) {
      enqueueSnackbar("You will shortly receive email to set password.", {
        variant: "success",
        onClose: () => onClearLoginMessage()
      });
      setForgotEmail("");
      setForgotPasswordActive(false);
    }
  }, [loginError, postForgotPasswordError, postForgotPasswordSuccess]);

  useEffect(() => {
    const parsedQuery = queryString.parse(location.search);
    if (parsedQuery.token) {
      localStorage.setItem("token", parsedQuery.token);
      history.replace("/login");
      fetchProfileInfo();
    }
  }, []);

  if (isAuthenticated && profile) {
    history.push("/");
  }

  const onSubmitForgotPassword = () => {
    if (!checkValidEmail(forgotEmail)) {
      return enqueueSnackbar("Email is invalid", {
        variant: "error",
        onClose: () => onClearLoginMessage()
      });
    }
    saveForgotPassword({ forgotEmail });
  };

  return (
    <AuthenticationWrapper>
      <div className={classes.profileContent}>
        <form
          onSubmit={e => {
            e.preventDefault();
            postLogin({ username, password });
          }}
        >
          {isMobile && <OuterLogo />}
          <Typography variant="h6">Sign in to your account</Typography>
          <TextField
            id="username"
            label="Email or Username"
            value={username}
            handleChange={val => setUsername(val)}
            autoFocus
            required
            fullWidth
            customClasses={classes.loginTextField}
          />
          <TextField
            id="password"
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
            disabled={isLoading}
            buttonRootClass={classes.loginButtonRoot}
            actionLoading={isLoading}
            buttonText="SIGN IN NOW"
          />
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={() => {
              setLoginGoogleActive(true);
              window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/google`;
            }}
            buttonRootClass={classes.loginButtonRoot}
            disabled={loginGoogleActive}
            actionLoading={loginGoogleActive}
          >
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Logo"
            />
            LOGIN WITH GOOGLE
          </Button>
          <Typography
            color="primary"
            className={classes.actionText}
            onClick={() => setForgotPasswordActive(true)}
          >
            Forgot your password?
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Don't have an account?{" "}
            <Link to="/register" className={classes.textLink}>
              Sign up
            </Link>
          </Typography>
        </form>
        <Modal
          open={forgotPasswordActive}
          handleClose={() => setForgotPasswordActive(false)}
          title="Reset your Password"
        >
          <Typography>
            Please fill your email address and you will shortly receive reset
            link.
          </Typography>
          <form
            onSubmit={e => {
              e.preventDefault();
              onSubmitForgotPassword();
            }}
          >
            <TextField
              id="forgot-email"
              label="Email"
              type="email"
              value={forgotEmail}
              handleChange={val => setForgotEmail(val)}
              autoFocus
              required
              fullWidth
              customClasses={classes.forgotPasswordField}
            />
            <Button
              variant="contained"
              size="large"
              color="primary"
              type="submit"
              fullWidth
              disabled={postForgotPasswordLoading}
              buttonRootClass={classes.loginButtonRoot}
              actionLoading={postForgotPasswordLoading}
              buttonText="Confirm"
            />
          </form>
        </Modal>
      </div>
    </AuthenticationWrapper>
  );
};

LoginPage.propTypes = {
  data: PropTypes.object,
  postLogin: PropTypes.func,
  onClearLoginMessage: PropTypes.func,
  fetchProfileInfo: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  saveForgotPassword: PropTypes.func
};

const mapStateToProps = state => ({ data: state.LoginReducer });

const mapDispatchToProps = dispatch => ({
  postLogin: credential => dispatch(login(credential)),
  saveForgotPassword: email => dispatch(postForgotPassword(email)),
  onClearLoginMessage: () => dispatch(clearLoginMessage()),
  fetchProfileInfo: () => dispatch(getProfileInfo())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(LoginPage);
