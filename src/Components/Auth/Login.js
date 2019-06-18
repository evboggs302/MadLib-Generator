import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../../ducks/UserReducer";
import axios from "axios";
import { NavLink } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  universalChangeHandler = (prop, value) => {
    this.setState({
      [prop]: value
    });
  };

  login = () => {
    const { username, password } = this.state;
    const picNumber = Math.floor(Math.random() * 9) + 1;
    const picture = `https://randomuser.me/api/portraits/med/lego/${picNumber}.jpg`;
    axios
      .post("/api/login", { username, password, picture })
      .then(user => {
        this.props.setUser(user.data);
      })
      .catch(err => {
        console.log(err);
        alert("Incorrect username/password");
      });
  };
  render() {
    const { username, password } = this.state;
    return (
      <div className="main-header">
        <div>
          <h3>Mad Libs</h3>
        </div>
        <div>
          <div>
            Username:
            <input
              onChange={e =>
                this.universalChangeHandler(e.target.name, e.target.value)
              }
              value={username}
              name="username"
            />
          </div>
          <div>
            Password:
            <input
              onChange={e =>
                this.universalChangeHandler(e.target.name, e.target.value)
              }
              type="password"
              value={password}
              name="password"
            />
            <NavLink to="/">
              <button onClick={this.login}>Login</button>
            </NavLink>
          </div>
        </div>
      </div>
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
export default invokedConnect(Login);
