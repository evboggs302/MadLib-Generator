import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./SideMenu.css";
import { connect } from "react-redux";
import { setUser } from "../../ducks/UserReducer";
import axios from "axios";

class SideMenu extends Component {
  logout = () => {
    axios.get("/api/logout").then(res => {
      this.props.setUser(null);
    });
  };

  render() {
    const { user } = this.props.user;
    let menuClasses = "sideMenu";
    if (this.props.show) {
      menuClasses = "sideMenu open";
    }
    return (
      <nav className={menuClasses}>
        <ul>
          <li>
            <NavLink exact to="/" onClick={this.props.click}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" onClick={this.props.click}>
              Shop
            </NavLink>
          </li>
          {!user ? (
            <ul>
              <li>
                <NavLink to="/login" onClick={this.props.click}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" onClick={this.props.click}>
                  Register
                </NavLink>
              </li>
            </ul>
          ) : (
            <li>
              <NavLink to="/" onClick={this.props.click}>
                <button className="logout" type="submit" onClick={this.logout}>
                  Logout
                </button>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
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
export default invokedConnect(SideMenu);
