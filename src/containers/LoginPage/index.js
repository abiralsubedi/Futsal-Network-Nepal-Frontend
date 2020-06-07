import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import queryString from "query-string";
import { Link, withRouter } from "react-router-dom";
import { Wrapper } from "components/Common";
import { login, loginSuccess } from "./actions";
import useStyles from "./style";

const LoginPage = props => {
  const { isAuthenticated } = props.data;
  const { history, location, postLogin, postLoginSuccess } = props;
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          <h1>Login</h1>
          <form
            onSubmit={e => {
              e.preventDefault();
              postLogin({ username, password });
            }}
          >
            <input
              type="text"
              placeholder="username"
              id="username"
              name="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              autoFocus
            />
            <input
              type="text"
              placeholder="password"
              id="password"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <button type="submit">Login</button>
          </form>
          <Link to="/register">Register account</Link>
          <h3
            onClick={() =>
              (window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/google`)
            }
            className={classes.cursorPointer}
          >
            Login with Google
          </h3>
        </div>
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
