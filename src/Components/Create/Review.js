import React, { Component } from "react";
import { connect } from "react-redux";
// import { setGiven, setSelected, setLines } from "../../ducks/CreationReducer";
import { NavLink } from "react-router-dom";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("state:", this.state);
    console.log("store:", this.props.creation);
    return <div>Review Component</div>;
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

// const mapDispatchToProps = {
//   setGiven,
//   setLines,
//   setSelected
// };

const invokedConnect = connect(
  mapStateToProps
  //   mapDispatchToProps
);
export default invokedConnect(Review);
