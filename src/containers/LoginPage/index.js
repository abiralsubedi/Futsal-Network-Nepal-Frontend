import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";

import { Wrapper } from "components/Common";
import { login } from "./actions";

class Home extends React.Component {
  componentDidMount() {
    this.props.postLogin();
  }

  render() {
    const { isAuthenticated } = this.props.data;
    const { history } = this.props;
    if (isAuthenticated) {
      history.push("/profile");
    }
    return (
      <Wrapper>
        <div>Hello</div>
      </Wrapper>
    );
  }
}

Home.propTypes = {
  data: PropTypes.object
};

const mapStateToProps = state => ({ data: state.LoginReducer });

const mapDispatchToProps = dispatch => ({
  postLogin: credential => dispatch(login(credential))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
