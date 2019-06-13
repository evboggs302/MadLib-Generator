import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  setGiven,
  setSelected,
  setLines,
  setBlanks,
  killStore
} from "../../ducks/CreationReducer";
import { NavLink } from "react-router-dom";

class Review extends Component {
  createTmplate = () => {
    const { lines, title, blanks } = this.props.creation;
    let types = [];
    for (let i = 0; i < blanks.length; i++) {
      types.push(blanks[i][0]);
    }

    let stringLines = [];
    for (let i = 0; i < lines.length; i++) {
      stringLines.push(lines[i][0]);
    }

    axios
      .post("/api/library", { title: title, blanks: types, lines: stringLines })
      .then(res => {
        alert(res.data);
      })
      .catch(error => {
        alert(error);
      });
  };

  comparator = (a, b) => {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
  };
  render() {
    console.log("store:", this.props.creation);
    const { blanks, lines, title } = this.props.creation;

    let sorted = blanks.sort(this.comparator);
    console.log(sorted);

    const mappedSortedBlanks = sorted.map((e, index) => {
      return <li key={index}>{e[0]}</li>;
    });

    var yourTemplate = [];
    for (let i = 0; i < blanks.length; i++) {
      yourTemplate.push(lines[i], " ", blanks[i][0], " ");
    }
    if (lines.length <= 2) {
      yourTemplate.push(lines[lines.length]);
    } else {
      yourTemplate.push(lines[lines.length - 1]);
    }

    return (
      <div>
        <h2>mapped required words</h2>
        <div>
          <ol type="1">{mappedSortedBlanks}</ol>
        </div>
        <br />
        <h2>Your Mad Lib Template</h2>
        <div>
          <h3>{title}</h3>
          <br />
          <div>{yourTemplate}</div>
        </div>
        <br />
        <div>
          <NavLink to="/createselect">
            <button onClick={this.props.killStore}>Go Back</button>
          </NavLink>

          <NavLink to="/">
            <button onClick={this.createTmplate}>Submit Template</button>
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
  setGiven,
  setSelected,
  setLines,
  setBlanks,
  killStore
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(Review);
