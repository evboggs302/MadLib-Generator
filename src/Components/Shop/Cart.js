import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import "./Cart.css";

class Cart extends Component {
  render() {
    return <div>Cart</div>;
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
export default invokedConnect(Cart);
