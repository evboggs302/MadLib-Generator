import React, { Component } from "react";
import { connect } from "react-redux";
// import axios from "axios";
import io from "socket.io-client";
import { NavLink } from "react-router-dom";

class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null
    };
    const socket = io.connect("http://localhost:3000/");
    socket.on("connection", () => {
      console.log("connected");
    });

    socket.on("get comm", data => {
      console.log(data);
      this.setState({
        items: data
      });
    });
  }

  render() {
    // const { items } = this.state;
    // const mappedItems = items.map();
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
            {/* {mappedItems} */}
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
