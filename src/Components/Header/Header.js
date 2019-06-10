import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../../ducks/reducer";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    };
  }

  universalChangeHandler = (prop, value) => {
    this.setState({
      [prop]: value
    });
  };

  componentDidMount() {
    axios.get("/api/user").then(res => {
      this.props.setUser(res.data);
    });
  }

  register = () => {
    const { username, email, password } = this.state;
    axios.post("/api/register", { username, email, password }).then(res => {
      this.props.setUser(res.data);
    });
  };

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
      <header className="main-header">
        <div>
          <h3>Mad Libs</h3>
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
          Password:
          <input
            onChange={e =>
              this.universalChangeHandler(e.target.name, e.target.value)
            }
            value={password}
            name="password"
          />
        </div>
        <div>
          <NavLink to="/register">Register</NavLink>
        </div>

        {/* {!user ? ( */}
        {/* //   <div>
          //     <div>
          //       Username:
          //       <input */}
        {/* //         onChange={e => */}
        {/* //           this.universalChangeHandler(e.target.name, e.target.value)
          //         }
          //         value={username}
          //         name="username"
          //       />
          //     </div> */}
        {/* //     <div>
          //       Email:
          //       <input
          //         onChange={e =>
          //           this.universalChangeHandler(e.target.name, e.target.value)
          //         }
          //         type="email"
          //         value={email}
          //         name="email"
          //       />
          //     </div>
          //     <div>
          //       Password:
          //       <input
          //         onChange={e =>
          //           this.universalChangeHandler(e.target.name, e.target.value)
          //         }
          //         type="password"
          //         value={password}
          //         name="password"
          //       />
          //     </div>
        //   <div>
        //     <button onClick={this.register}>Register</button>
        //     <button onClick={this.login}>Login</button>
        //   </div>
        // ) : (
        //   //   </div>
        // //   <div>{JSON.stringify(user)}</div>
        //   //   <MyLinks logout={this.logout} />
        // )} */}
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
