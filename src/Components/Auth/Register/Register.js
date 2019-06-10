import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../../../ducks/UserReducer";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      email: "",
      password: ""
    };
  }

  universalChangeHandler = (prop, value) => {
    this.setState({
      [prop]: value
    });
  };

  register = () => {
    const { name, username, email, password } = this.state;
    axios
      .post("/api/register", { name, username, email, password })
      .then(res => {
        this.props.setUser(res.data);
      });
  };

  render() {
    console.log(this.props);
    console.log(this.state);
    const { name, username, password, email } = this.state;
    // const { user } = this.props;
    return (
      <div>
        <div>
          Name:
          <input
            onChange={e =>
              this.universalChangeHandler(e.target.name, e.target.value)
            }
            value={name}
            name="name"
          />
        </div>
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
          Email:
          <input
            onChange={e =>
              this.universalChangeHandler(e.target.name, e.target.value)
            }
            type="email"
            value={email}
            name="email"
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
        </div>
        <div>
          <button onClick={this.register}>Register</button>
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

export default invokedConnect(Register);
