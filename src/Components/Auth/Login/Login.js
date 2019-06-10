import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../../ducks/reducer";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./header.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  login = () => {
    const { username, password } = this.state;
    axios.post("/api/login", { username, password }).then(res => {
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
    console.log(this.state);
    const { username, password, email } = this.state;
    const { user } = this.props;
    return (
      <div>
        <div>
          username:
          <input
            onChange={e =>
              this.universalChangeHandler(e.target.name, e.target.value)
            }
            value={username}
            name="username"
          />
        </div>
        <div>
          password:
          <input
            onChange={e =>
              this.universalChangeHandler(e.target.name, e.target.value)
            }
            value={password}
            name="password"
          />
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
