import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import queryString from "query-string";
import { Link, withRouter } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Switch from "@material-ui/core/Switch";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useSnackbar } from "notistack";

import { ThemeContext } from "context/themeContext";

import Button from "components/Button";
import { Wrapper } from "components/Common";
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
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");

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
    history.push("/profile");
  }

  return (
    <Wrapper>
      <div className={classes.profileContent}>
        <form
          onSubmit={e => {
            e.preventDefault();
            postLogin({ username, password });
          }}
        >
          <Typography variant="h1" className={classes.title}>
            Login
          </Typography>
          <Typography variant="h1" color="secondary">
            Test
          </Typography>
          <TextField
            id="username"
            label="Username"
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
          >
            {isLoading && (
              <CircularProgress
                color="inherit"
                size="1.25rem"
                classes={{ root: classes.circularRoot }}
              />
            )}
            SIGN IN NOW
          </Button>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={() =>
              (window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/google`)
            }
          >
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Logo"
            />
            LOGIN WITH GOOGLE
          </Button>
          <Typography variant="body1" color="textSecondary">
            Don't have an account?{" "}
            <Link to="/register" className={classes.textLink}>
              Sign up
            </Link>
          </Typography>
          <Switch
            checked={darkMode}
            onChange={() => {
              setDarkMode(prev => !prev);
              localStorage.setItem("darkMode", !darkMode);
            }}
            name="checkedA"
            color="primary"
          />
          <Typography variant="h1" color="primary">
            hello
          </Typography>
        </form>
      </div>
    </Wrapper>
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
