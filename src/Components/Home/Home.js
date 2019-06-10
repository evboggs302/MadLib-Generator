import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../../ducks/reducer";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  render() {
    return <div>Home Component</div>;
  }
}
const mapStateToProps = reduxState => {
  return reduxState;
};

//   const mapDispatchToProps = {
//     setUser
//   };

const invokedConnect = connect(
  mapStateToProps
  // mapDispatchToProps
);
export default invokedConnect(Home);
