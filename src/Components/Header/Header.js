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
          {!user ? (
            <nav className="logi_reg">
              <NavLink className="home" exact to="/">
                Home
              </NavLink>
              <NavLink className="shop" to="/shop">
                Shop
              </NavLink>
              <NavLink className="login" to="/login">
                Login
              </NavLink>

              <NavLink className="regi" to="/register">
                Register
              </NavLink>
            </nav>
          ) : (
            <nav className="user">
              <NavLink className="home" exact to="/">
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
