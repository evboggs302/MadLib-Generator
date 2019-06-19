import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../../ducks/UserReducer";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./Header.css";
import MenuButton from "./MenuButton";

class Header extends Component {
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

  render() {
    console.log(this.props);
    const { user } = this.props.user;
    return (
      <header>
        <h3 className="title">The MadLib-Project</h3>
        <div className="container">
          <div className="home_shop">
            <NavLink exact to="/">
              Home
            </NavLink>
            <NavLink to="/shop">Shop</NavLink>
          </div>
          {!user ? (
            <nav className="logi_reg">
              <NavLink to="/login">Login</NavLink>

              <NavLink to="/register">Register</NavLink>
            </nav>
          ) : (
            <nav>
              <div className="user">
                <div>{user.username}</div>
                <img src={`${user.picture}`} alt="" />
              </div>
              <div className="logout">
                <NavLink to="/">
                  <button type="submit" onClick={this.logout}>
                    Logout
                  </button>
                </NavLink>
              </div>
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
