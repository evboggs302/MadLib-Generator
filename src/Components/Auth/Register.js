import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../../ducks/UserReducer";
import axios from "axios";
import { NavLink } from "react-router-dom";

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
    const picNumber = Math.floor(Math.random() * 9) + 1;
    const picture = `https://randomuser.me/api/portraits/med/lego/${picNumber}.jpg`;
    const { name, username, email, password } = this.state;
    axios
      .post("/api/register", { name, username, email, password, picture })
      .then(res => {
        console.log(res.data);
        const { username, email, user_id } = res.data;
        this.props.setUser({ username, email, user_id, picture });
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.state);
    const { name, username, password, email } = this.state;
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
          <NavLink to="/">
            <button onClick={this.register}>Register</button>
          </NavLink>
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
