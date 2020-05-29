import React from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";

class Header extends React.Component {
  componentDidMount() {}

  render() {
    return <h1>This is header</h1>;
  }
}

Header.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
