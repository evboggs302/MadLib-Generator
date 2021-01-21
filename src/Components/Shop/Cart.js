import { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { setCart, setStock } from "../../ducks/ShopReducer";
import "./ShopCart.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      final: 0
    };
  }

  componentDidMount = () => {
    this.getTotal();
  };

  getTotal = () => {
    const { cart } = this.props.shop;
    let cost = 0;
    cart.map(e => {
      const { prod_price } = e;
      var price = +prod_price;
      return (cost += price);
    });
    this.setState({
      final: cost
    });
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

  deleteCartContents = () => {
    const { user_id } = this.props.user.user;
    axios
      .delete(`/api/shop/cart/${user_id}`)
      .then(cart => {
        this.props.setCart(cart.data);
      })
      .catch(err => console.log(err));
  };

  onToken = token => {
    console.log(token);
    const { final } = this.state;
    axios.post("/api/charge", { token, final });
  };

  render() {
    console.log(this.state);
    console.log(this.props.shop);
    const { cart } = this.props.shop;
    const mappedCart = cart.map(e => {
      const { prod_id, prod_name, prod_price } = e;

      return (
        <div className="scitem" key={prod_id}>
          <h3>{prod_name}</h3>
          <div>{prod_price}</div>
          <div id="scButcontainer">
            <button
              id="removecart"
              onClick={() => this.removeFromCart(prod_name)}
            >
              Remove From Cart
            </button>
          </div>
        </div>
      );
    });
    return (
      <div className="SCcontainer">
        <h1>Cart</h1>
        {!cart.length ? (
          <div id="nocartlength">
            <div>
              {"OH NO! It appears as though you have nothing in your cart."}
            </div>
            <div>{"Please go to the store and find something nice!"}</div>
          </div>
        ) : (
          <div id="cartlength">
            <div id="payment">
              <StripeCheckout
                token={this.onToken}
                stripeKey="pk_test_k7TYhKQj3micGckl753j3C2b00ZnyhVPbe"
                amount={100 * this.state.final}
              />
            </div>
            <div className="mappedstocart">{mappedCart}</div>
            <div id="scButcontainer">
              <NavLink to="/shop">
                <button id="gobackshopping">Return to Store</button>
              </NavLink>
              <button id="removeALLcart" onClick={this.deleteCartContents}>
                Remove ALL Item
              </button>
            </div>
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
