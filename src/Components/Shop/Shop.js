import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import "./Shop.css";

class Shop extends Component {
  render() {
    return (
      <div>
        <div>Shop Component</div>
        <NavLink to="/shopping/cart">Shopping Cart</NavLink>
      </div>
    );
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
export default invokedConnect(Shop);
