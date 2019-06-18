import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../../ducks/UserReducer";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./Header.css";

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
      <header className="main-header">
        <div>
          <h3>Mad Libs</h3>
        </div>
        {!user ? (
          <div>
            <div>
              <NavLink to="/login">Login</NavLink>
            </div>
            <div>
              <NavLink to="/register">Register</NavLink>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <div>{user.username}</div>
              <img src={`${user.picture}`} alt="" />
            </div>
            <div>
              <NavLink to="/">
                <button type="submit" onClick={this.logout}>
                  Logout
                </button>
              </NavLink>
            </div>
          </div>
        )}
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
