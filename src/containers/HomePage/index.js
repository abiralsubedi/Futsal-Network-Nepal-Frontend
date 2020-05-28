import React from "react";
import { connect } from "react-redux";

import { requestApiData } from "./actions";

class Home extends React.Component {
  componentDidMount() {
    this.props.requestApiData();
  }

  person = (x, i) => (
    <div key={x.id.value}>
      <h1>{x.gender}</h1>
      <h1>{x.name.first}</h1>
      <h1>{x.name.last}</h1>
      <img src={x.picture.medium} alt="hello" />
    </div>
  );
  render() {
    const { results = [] } = this.props.data;
    return results.length ? (
      <h1>{results.map(this.person)}</h1>
    ) : (
      <h1>loading...</h1>
    );
  }
}

const mapStateToProps = state => ({ data: state.HomeReducer });

const mapDispatchToProps = dispatch => ({
  requestApiData: () => dispatch(requestApiData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
