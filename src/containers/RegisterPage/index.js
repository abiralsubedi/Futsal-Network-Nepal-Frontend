import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Wrapper } from "components/Common";
import { register } from "./actions";
import useStyles from "./style";

const Home = props => {
  const { isAuthenticated } = props.data;
  const { history } = props;
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (isAuthenticated) {
    history.push("/profile");
  }

  return (
    <Wrapper>
      <div className={classes.content}>
        <div className={classes.loginScreen}>
          <h1>Register</h1>
          <form
            onSubmit={e => {
              e.preventDefault();
              props.postRegister({ username, password });
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
            <button type="submit">Register</button>
          </form>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </Wrapper>
  );
};

Home.propTypes = {
  data: PropTypes.object
};

const mapStateToProps = state => ({
  data: state.LoginReducer,
  registerData: state.RegisterReducer
});

const mapDispatchToProps = dispatch => ({
  postRegister: credential => dispatch(register(credential))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(Home);
