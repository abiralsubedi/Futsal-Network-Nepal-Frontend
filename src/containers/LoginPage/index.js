import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Wrapper } from "components/Common";
import { login } from "./actions";
import useStyles from "./style";

const Home = props => {
  // useEffect(() => {
  //   props.postLogin();
  // }, []);

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
          <form
            onSubmit={e => {
              e.preventDefault();
              props.postLogin({ username, password });
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
        </div>
      </div>
    </Wrapper>
  );
};

Home.propTypes = {
  data: PropTypes.object
};

const mapStateToProps = state => ({ data: state.LoginReducer });

const mapDispatchToProps = dispatch => ({
  postLogin: credential => dispatch(login(credential))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(Home);
