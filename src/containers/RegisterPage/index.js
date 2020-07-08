import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

import { Typography, InputAdornment, IconButton } from "@material-ui/core";
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
    onClearRegisterMessage,
    postRegister
  } = props;

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { isMobile } = useContext(ThemeContext);

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

  const onSubmitRegister = () => {
    if (!/^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)) {
      return enqueueSnackbar("Email is invalid", {
        variant: "error",
        onClose: () => onClearRegisterMessage()
      });
    }
    postRegister({ fullName, emailAddress, password, location });
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
