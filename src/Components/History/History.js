import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
import {
  setHistory,
  setHistoryDate,
  setHistoryStory,
  setHistoryTitle,
  setID,
  setShare
} from "../../ducks/HistoryReducer";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    };
  }
  componentDidMount() {
    // this.getUserHistory();
  }
  shareStorytoCommunity = () => {};
  sortByTitle = () => {};
  sortByDate = () => {};

  getUserHistory = () => {
    axios
      .get("/api/history")
      .then(res => {
        console.log("history data:", res.data);
        this.setState({
          history: res.data
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return <div>History Component</div>;
  }
}
const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setHistory,
  setHistoryDate,
  setHistoryStory,
  setHistoryTitle,
  setID,
  setShare
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(History);
