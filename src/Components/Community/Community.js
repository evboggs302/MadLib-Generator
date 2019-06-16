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
      items: null
    };

    socket.emit("get comm", getRequest => {
      console.log(getRequest);
    });

    socket.on("shared data", data => {
      console.log(data);
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
    socket.emit("new message");
  };

  render() {
    // const { items } = this.state;
    // const mappedItems = items.map();
    console.log(this.state);
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
