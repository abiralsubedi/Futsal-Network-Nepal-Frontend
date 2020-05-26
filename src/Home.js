import React from "react";
import { connect } from "react-redux";

import { requestHelloWorld } from "./actions";

class Home extends React.Component {
  componentDidMount() {
    this.props.requestHelloWorld();
  }

  render() {
    return <h1>{this.props.helloWorld}</h1>;
  }
}

const mapStateToProps = state => ({ helloWorld: state.helloWorld });

const mapDispatchToProps = dispatch => ({
  requestHelloWorld: () => dispatch(requestHelloWorld())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
