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

import { login, clearLoginMessage, getProfileInfo } from "./actions";
import useStyles from "./style";

const LoginPage = props => {
  const { isAuthenticated, isLoading, loginError, profile } = props.data;
  const {
    history,
    location,
    postLogin,
    onClearLoginMessage,
    fetchProfileInfo
  } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { isMobile } = useContext(ThemeContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [loginGoogleActive, setLoginGoogleActive] = useState(false);

  useEffect(() => {
    if (loginError) {
      enqueueSnackbar(loginError, {
        variant: "error",
        onClose: () => onClearLoginMessage()
      });
    }
  }, [loginError]);

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
            variant="body1"
            color="textSecondary"
            style={{ marginTop: "1rem" }}
          >
            Don't have an account?{" "}
            <Link to="/register" className={classes.textLink}>
              Sign up
            </Link>
          </Typography>
        </form>
      </div>
    </AuthenticationWrapper>
  );
};

LoginPage.propTypes = {
  data: PropTypes.object,
  postLogin: PropTypes.func,
  onClearLoginMessage: PropTypes.func,
  fetchProfileInfo: PropTypes.func
};

const mapStateToProps = state => ({ data: state.LoginReducer });

const mapDispatchToProps = dispatch => ({
  postLogin: credential => dispatch(login(credential)),
  onClearLoginMessage: () => dispatch(clearLoginMessage()),
  fetchProfileInfo: () => dispatch(getProfileInfo())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(LoginPage);
