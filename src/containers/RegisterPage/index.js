import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

import {
  Switch,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import AuthenticationWrapper from "components/AuthenticationWrapper";
import TextField from "components/TextField";
import Button from "components/Button";
import { OuterLogo } from "components/Common";
import { ThemeContext } from "context/themeContext";

import { register, clearRegisterMessage } from "./actions";
import useStyles from "./style";

const Home = props => {
  const { isAuthenticated, profile } = props.data;
  const {
    history,
    registerData: { registerError, registerLoading },
    onClearRegisterMessage
  } = props;

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { darkMode, setDarkMode, isMobile } = useContext(ThemeContext);

  useEffect(() => {
    if (registerError) {
      enqueueSnackbar(registerError, {
        variant: "error",
        onClose: () => onClearRegisterMessage()
      });
    }
  }, [registerError]);

  if (isAuthenticated && profile) {
    history.push("/profile");
  }

  return (
    <AuthenticationWrapper>
      <div className={classes.content}>
        <form
          onSubmit={e => {
            e.preventDefault();
            props.postRegister({ username, password });
          }}
        >
          {isMobile && <OuterLogo />}
          <Typography variant="h6">Create your account</Typography>
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
            disabled={registerLoading}
          >
            {registerLoading && (
              <CircularProgress
                color="inherit"
                size="1.25rem"
                classes={{ root: classes.circularRoot }}
              />
            )}{" "}
            SIGN UP NOW
          </Button>
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
          <Switch
            checked={darkMode}
            onChange={() => {
              setDarkMode(prev => !prev);
              localStorage.setItem("darkMode", !darkMode);
            }}
            name="checkedA"
            color="primary"
          />
        </form>
      </div>
    </AuthenticationWrapper>
  );
};

Home.propTypes = {
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

export default compose(withRouter, withConnect)(Home);
