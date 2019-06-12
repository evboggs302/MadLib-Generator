import React, { Component } from "react";
import { connect } from "react-redux";
import { setGiven, setSelected, setLines } from "../../ducks/CreationReducer";
import axios from "axios";
import { NavLink, Redirect } from "react-router-dom";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }
  render() {
    return <div>Review Component</div>;
  }
}
const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setGiven,
  setLines,
  setSelected
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(Review);
