import React, { Component } from "react";
import { connect } from "react-redux";
// import axios from "axios";
import io from "socket.io-client";
import { NavLink } from "react-router-dom";

const socket = io.connect(`http://localhost:19711/`);

class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };

    socket.emit("get comm", getRequest => {
      console.log(getRequest);
    });

    socket.on("shared data", data => {
      this.setState({
        items: data
      });
    });

    socket.on("disconnect", bye => {
      console.log(bye);
    });
  }

  componentDidMount = () => {
    this.getCommunity();
  };

  componentWillUnmount = () => {
    socket.on("disonnect");
  };

  getCommunity = () => {
    socket.emit("get comm");
  };

  render() {
    const { items } = this.state;
    const mappedItems = items.map((e, index) => {
      const { to_char, title, story, user_id, username } = e;
      const date = to_char;
      return (
        <div key={index}>
          <h1>{title}</h1>
          <div key={user_id}>
            <div>{story}</div>
            <div>
              <div>{date}</div>
              <div>{`@${username}`}</div>
            </div>
          </div>
          <br />
        </div>
      );
    });
    return (
      <div>
        <h1>Community will be using sockets</h1>
        <div>
          <NavLink to="/">
            <button>Home</button>
          </NavLink>
          <NavLink to="/library">
            <button>Library</button>
          </NavLink>
          <NavLink to="/history">
            <button>History</button>
          </NavLink>
        </div>
        <div>
          <span>
            Insert live feed here
            {mappedItems}
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

//   const mapDispatchToProps = {
//     setStory
//   };

const invokedConnect = connect(
  mapStateToProps
  // mapDispatchToProps
);
export default invokedConnect(Community);
