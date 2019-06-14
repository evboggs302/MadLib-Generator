import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { setCart, setStock } from "../../ducks/ShopReducer";
import "./Shop.css";

class Shop extends Component {
  componentDidMount = () => {
    const { user_id } = this.props.user.user;
    this.getCartItems(user_id);
  };
  componentWillMount = () => {
    console.log(this.props);
    const { user_id } = this.props.user.user;
    this.getShopItems(user_id);
  };

  getShopItems = id => {
    axios
      .get(`/api/shop/${id}`)
      .then(res => {
        console.log(res.data);
        this.props.setStock(res.data);
      })
      .catch(err => console.log(err));
  };
  getCartItems = id => {
    axios.get(`/api/shop/cart/${id}`).then(res => {
      console.log(res.data);
    });
  };

  render() {
    console.log(this.props);
    const { stock } = this.props.shop;
    const mappedStock = stock.map(e => {
      const { prod_id, prod_img, prod_name, prod_price, quantity, user_id } = e;
      console.log(prod_img);
      return (
        <div key={prod_id}>
          <div>
            <img src={`${prod_img}`} alt="" />
          </div>
          <div>
            <h3>{prod_name}</h3>
          </div>
          <div>
            <div>{prod_price}</div>
          </div>
          <div>
            <button>Add To Cart</button>
          </div>
        </div>
      );
    });
    return (
      <div>
        <h1>The Shop</h1>
        <NavLink to="/shopping/cart">
          <button>Shopping Cart</button>
        </NavLink>
        <div>{mappedStock}</div>
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
export default invokedConnect(Shop);
