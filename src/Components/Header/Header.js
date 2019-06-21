import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../ducks/UserReducer";
import { NavLink } from "react-router-dom";
import MenuButton from "./MenuButton";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Backdrop from "../Backdrop/Backdrop";
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      showRegister: false,
      showOpen: false
    };
  }
  componentDidMount = () => {
    axios.get("/api/user").then(res => {
      this.props.setUser(res.data);
    });
  };

  logout = () => {
    axios.get("/api/logout").then(res => {
      this.props.setUser(null);
    });
  };
  toggleLogin = () => {
    this.setState({
      showLogin: !this.state.showLogin
    });
  };
  toggleRegister = () => {
    this.setState({
      showRegister: !this.state.showRegister
    });
  };
  // backdropClickHandler = () => {
  //   this.setState({
  //     showOpen: false
  //   });
  // };

  render() {
    let backdrop;
    if (this.state.sideMenuOpen) {
      // click={this.backdropClickHandler}
      backdrop = <Backdrop />;
    }
    console.log(this.props);
    const { user } = this.props.user;
    return (
      <header>
        <h3 className="title">The MadLib-Project</h3>
        <div className="container">
          {!user ? (
            <nav className="logi_reg">
              <NavLink exact to="/">
                Home
              </NavLink>
              <NavLink to="/shop">Shop</NavLink>
              <NavLink to="/login">Login</NavLink>
              {this.state.showLogin ? (
                <Login
                  click={this.backdropClickHandler}
                  closePopup={this.toggleLogin}
                />
              ) : null}
              <NavLink to="/register">Register</NavLink>
              {this.state.showRegister ? (
                <Register
                  click={this.backdropClickHandler}
                  closePopup={this.toggleRegister}
                />
              ) : null}
            </nav>
          ) : (
            <nav className="user">
              <NavLink className="homer" exact to="/">
                Home
              </NavLink>
              <NavLink className="shop" to="/shop">
                Shop
              </NavLink>
              <NavLink to="/">
                <button
                  className="logoutHead"
                  type="submit"
                  onClick={this.logout}
                >
                  Logout
                </button>
              </NavLink>

              <div>{`@${user.username}`}</div>
              <img className="pic" src={`${user.picture}`} alt="" />
            </nav>
          )}
          <MenuButton click={this.props.menuToggler} className="menu" />
        </div>
      </header>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setUser
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(Header);
