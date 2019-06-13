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
  componentDidMount() {
    this.getUserHistory();
  }

  sortByTitle = () => {
    axios.put("/api/history/bytitle");
  };
  sortByDate = () => {
    axios.put("/api/history/bydate");
  };

  getUserHistory = () => {
    axios
      .get("/api/history")
      .then(res => {
        console.log("history data:", res.data);
        this.props.setHistory(res.data);
      })
      .catch(err => {
        console.log(err);
        alert("OH NO! It appears as though you don't have any history to view");
      });
  };

  render() {
    console.log(this.props);
    // const mappedHistory =
    return (
      <div>
        <h2>Your History</h2>
        <span />
      </div>
    );
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
