import React, { useState, useContext } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import queryString from "query-string";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import { Link, withRouter } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";

import { ThemeContext } from "context/themeContext";
import { Wrapper } from "components/Common";
import TextField from "components/TextField";

import { login, loginSuccess } from "./actions";
import useStyles from "./style";

const LoginPage = props => {
  const { isAuthenticated } = props.data;
  const { history, location, postLogin, postLoginSuccess } = props;
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const parsedQuery = queryString.parse(location.search);
  if (parsedQuery.token) {
    localStorage.setItem("token", parsedQuery.token);
    postLoginSuccess({ token: parsedQuery.token });
  }
  if (isAuthenticated) {
    history.push("/profile");
  }
  return (
    <Wrapper>
      <div className={classes.content}>
        <div className={classes.loginScreen}>
          <Typography variant="h1" className={classes.title}>
            Login
          </Typography>
          <Typography variant="h1" color="secondary">
            Test
          </Typography>
          <form
            onSubmit={e => {
              e.preventDefault();
              postLogin({ username, password });
            }}
            autocomplete="off"
          >
            <TextField
              id="username"
              label="Username"
              value={username}
              handleChange={val => setUsername(val)}
              defaultValue
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
              classes={{
                root: classes.buttonRoot,
                label: classes.buttonLabel
              }}
            >
              SIGN IN NOW
            </Button>
            <Button
              variant="contained"
              size="large"
              fullWidth
              classes={{
                root: classes.buttonRoot,
                label: classes.buttonLabel
              }}
              onClick={() =>
                (window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/google`)
              }
            >
              <img src="https://img.icons8.com/color/48/000000/google-logo.png" />
              LOGIN WITH GOOGLE
            </Button>
          </form>
          <Typography variant="body1" color="textSecondary">
            Don't have an account?{" "}
            <Link to="/register" className={classes.textLink}>
              Sign up
            </Link>
          </Typography>
        </div>
        <Typography variant="h1" color="primary">
          hello
        </Typography>
        <Switch
          checked={darkMode}
          onChange={() => {
            localStorage.setItem("darkMode", !darkMode);
            setDarkMode(prev => !prev);
          }}
          name="checkedA"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
    </Wrapper>
  );
};

LoginPage.propTypes = {
  data: PropTypes.object,
  postLogin: PropTypes.func,
  postLoginSuccess: PropTypes.func
};

const mapStateToProps = state => ({ data: state.LoginReducer });

const mapDispatchToProps = dispatch => ({
  postLogin: credential => dispatch(login(credential)),
  postLoginSuccess: data => dispatch(loginSuccess(data))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(LoginPage);
