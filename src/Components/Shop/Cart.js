import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setCart, setStock } from "../../ducks/ShopReducer";
import "./Cart.css";

class Cart extends Component {
  componentWillMount = () => {};

  // when Stripe is completed
  //updateQuant = () => {};

  removeFromCart = name => {
    const { user_id } = this.props.user.user;
    axios
      .put(`/api/shoppingcart/${user_id}`, { name: name })
      .then(cart => {
        this.props.setCart(cart.data);
      })
      .catch(err => console.log(err));
  };

  deleteCartContents = () => {
    const { user_id } = this.props.user.user;
    axios
      .delete(`/api/shop/cart/${user_id}`)
      .then(cart => {
        this.props.setCart(cart.data);
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.props.shop);
    const { cart } = this.props.shop;
    const mappedCart = cart.map(e => {
      const { prod_id, prod_img, prod_name, prod_price } = e;
      // const {quantity, user_id} = e

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
            <button onClick={() => this.removeFromCart(prod_name)}>
              Remove From Cart
            </button>
            <div>
              Quanity
              <select>
                <option>{1}</option>
                <option>{2}</option>
                <option>{3}</option>
                <option>{4}</option>
                <option>{5}</option>
              </select>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <div>
          <h1>Cart</h1>
          <button>Checkout</button>
        </div>
        {!cart.length ? (
          <div>
            <div>
              {"OH NO! It appears as though you have nothing in your cart."}
            </div>
            <div>{"Please go to the store and find something nice!"}</div>
          </div>
        ) : (
          <div>
            {mappedCart}
            <button onClick={this.deleteCartContents}>
              remove ALL items from cart
            </button>
          </div>
        )}
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
