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
import "./Review.css";

class Review extends Component {
  getFullLibrary = () => {
    axios.get(`/api/library`).then(res => {
      this.setState({
        ...this.state,
        library: res.data
      });
    });
  };
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
    this.getFullLibrary();
  };

  comparator = (a, b) => {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
  };
  render() {
    console.log("store:", this.props.creation);
    const { given, blanks, lines, title } = this.props.creation;

    let sorted = blanks.sort(this.comparator);
    let selected = given.split(" ");

    const mappedSortedBlanks = sorted.map((type, index) => {
      console.log(type);
      return <li key={index}>{`"${selected[type[1]]}" to be a ${type[0]}`}</li>;
    });

    var yourTemplate = [];
    for (let i = 0; i < blanks.length; i++) {
      if (blanks[i][0]) {
        yourTemplate.push(lines[i], " ", blanks[i][0], " ");
      } else {
        let theRest = lines.slice(i, lines.length - 1);
        yourTemplate.push(theRest);
        break;
      }
    }
    yourTemplate.push(lines[lines.length - 1]);

    console.log("store:", this.props.creation);
    console.log("yourTemplate:", yourTemplate);
    return (
      <div className="reviewbucket">
        <h2>You Selected .... </h2>
        <div id="selectedWords">
          <ol type="1">{mappedSortedBlanks}</ol>
        </div>
        <h2>Your Template</h2>
        <div id="yourtemp">
          <h3>{title}</h3>
          <div>{yourTemplate}</div>
        </div>
        <br />
        <div id="reviewbuts">
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
