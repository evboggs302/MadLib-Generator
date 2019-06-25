import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { NavLink } from "react-router-dom";
import "../History/Hist_Comm.css";

const socket = io();

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
    socket.emit("get_comm");
  };

  render() {
    const { items } = this.state;
    const mappedItems = items.map((e, index) => {
      const { to_char, title, story, user_id, username } = e;
      const date = to_char;
      return (
        <div id="box" key={index}>
          <h3>{title}</h3>
          <div className="storyContainer" key={user_id}>
            <p>{story}</p>
            <div id="storyinfo">
              <div>{date}</div>
              <div>{`@${username}`}</div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="outerbox">
        <h1>LIVE Updates</h1>
        <span>{mappedItems}</span>
        <div className="innerbox">
          <div id="hcBut">
            <NavLink to="/">
              <button id="hcHome">Home</button>
            </NavLink>
          </div>
          <div id="hcBut">
            <NavLink to="/library">
              <button id="hcLib">Library</button>
            </NavLink>
          </div>
          <div id="hcBut">
            <NavLink to="/history">
              <button id="hcHist">History</button>
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

const invokedConnect = connect(mapStateToProps);
export default invokedConnect(Community);
