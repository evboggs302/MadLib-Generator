import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { setCart, setStock } from "../../ducks/ShopReducer";
import "./Cart.css";

class Cart extends Component {
  componentWillMount = () => {};

  updateQuant = () => {};

  removeFromCart = () => {};

  deleteCartContents = () => {};

  render() {
    console.log(this.props.shop);
    const { cart } = this.props.shop;
    // const mappedCart = cart.map()
    return (
      <div>
        <h1>Cart</h1>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setCart,
  setStock
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(Cart);
