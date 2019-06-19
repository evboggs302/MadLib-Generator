import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { setCart, setStock } from "../../ducks/ShopReducer";
import "./Shop.css";

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

  addToCart = (img, name, price, quant) => {
    const { user_id } = this.props.user.user;
    axios
      .post(`/api/shopping/cart/${user_id}`, {
        image: img,
        name: name,
        price: price,
        quant: quant
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
      const { prod_id, prod_img, quantity, prod_name, prod_price } = e;
      // const { user_id} = e
      let inCart = false;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].prod_name === e.prod_name) {
          inCart = true;
        }
      }
      return (
        <div key={prod_id}>
          {quantity === 0 ? (
            []
          ) : (
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
                {!user ? (
                  <div>
                    <div type="text">
                      **To add item to your cart, please login first.
                    </div>
                  </div>
                ) : inCart === false ? (
                  <button
                    onClick={() =>
                      this.addToCart(prod_img, prod_name, prod_price, 1)
                    }
                  >
                    Add To Cart
                  </button>
                ) : (
                  <button onClick={() => this.removeFromCart(prod_name)}>
                    Remove From Cart
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      );
    });

    return (
      <div>
        <h1>The Shop</h1>
        {!user ? (
          <div>
            <div type="text">**To access the cart, please login first.</div>
          </div>
        ) : (
          <NavLink to="/shopping/cart">
            <button>Shopping Cart</button>
          </NavLink>
        )}

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
