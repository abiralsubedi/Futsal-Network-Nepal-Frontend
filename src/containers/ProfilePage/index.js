import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getTestData } from "./actions";

class ProfilePage extends React.Component {
  componentDidMount() {
    this.props.fetchTestData();
  }

  render() {
    const { data } = this.props;
    return <h1>{data.updated || data.default}</h1>;
  }
}

ProfilePage.propTypes = {
  data: PropTypes.object
};

const mapStateToProps = state => ({ data: state.ProfileReducer });

const mapDispatchToProps = dispatch => ({
  fetchTestData: () => dispatch(getTestData())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
