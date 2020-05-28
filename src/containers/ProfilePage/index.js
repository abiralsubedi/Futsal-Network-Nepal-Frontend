import React from "react";
import { connect } from "react-redux";

import { getTestData } from "./actions";

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchTestData();
  }

  render() {
    const { data } = this.props;
    return <h1>{data.updated || data.default}</h1>;
  }
}

const mapStateToProps = state => ({ data: state.ProfileReducer });

const mapDispatchToProps = dispatch => ({
  fetchTestData: () => dispatch(getTestData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
