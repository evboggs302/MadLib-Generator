import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { setCart, setStock } from "../../ducks/ShopReducer";
import "./ShopCart.css";

class Shop extends Component {
  componentDidMount = () => {
    const { user } = this.props.user;
    if (user) {
      const { user_id } = this.props.user.user;
      this.getCartItems(user_id);
    }
  };
  componentWillMount = () => {
    console.log(this.props);
    this.getShopItems();
  };

  getShopItems = () => {
    axios
      .get(`/api/shop`)
      .then(res => {
        this.props.setStock(res.data);
      })
      .catch(err => console.log(err));
  };
  getCartItems = () => {
    const { user_id } = this.props.user.user;
    console.log(user_id);
    axios
      .get(`/api/shoppingcart/${user_id}`)
      .then(cart => {
        console.log(cart.data);
        this.props.setCart(cart.data);
      })
      .catch(err => console.log(err));
  };

  addToCart = (name, price) => {
    const { user_id } = this.props.user.user;
    axios
      .post(`/api/shopping/cart/${user_id}`, {
        name: name,
        price: price
      })
      .then(cart => {
        this.props.setCart(cart.data);
      })
      .catch(err => console.log(err));
  };

  removeFromCart = name => {
    const { user_id } = this.props.user.user;
    axios
      .put(`/api/shoppingcart/${user_id}`, { name: name })
      .then(cart => {
        this.props.setCart(cart.data);
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.props);
    const { user } = this.props.user;
    const { stock, cart } = this.props.shop;

    const mappedStock = stock.map(e => {
      const { prod_id, prod_name, prod_price } = e;
      let inCart = false;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].prod_name === e.prod_name) {
          inCart = true;
        }
      }
      return (
        <div className="scitem" key={prod_id}>
          <h3>{prod_name}</h3>
          <div id="pricing">
            {`$${prod_price}`}
            <div id="scButcontainer">
              {!user ? (
                <div>
                  <div id="nousershop" type="text">
                    **To add item to your cart, please login first.
                  </div>
                </div>
              ) : inCart === false ? (
                <button
                  id="addcart"
                  onClick={() => this.addToCart(prod_name, prod_price)}
                >
                  Add To Cart
                </button>
              ) : (
                <button
                  id="removecart"
                  onClick={() => this.removeFromCart(prod_name)}
                >
                  Remove From Cart
                </button>
              )}
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="SCcontainer">
        <h1>The Shop</h1>
        {!user ? (
          <div id="nousershop">
            <div type="text">**To access the cart, please login first.</div>
          </div>
        ) : (
          <div id="scButcontainer">
            <NavLink to="/shopping/cart">
              <button id="goneshopping">Shopping Cart</button>
            </NavLink>
          </div>
        )}
        <div className="mappedstocart">{mappedStock}</div>
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
