import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setGiven,
  setSelected,
  setLines,
  setBlanks,
  killStore
} from "../../ducks/CreationReducer";
import { NavLink } from "react-router-dom";

class Review extends Component {
  constructor(props) {
    super(props);
  }
  comparator = (a, b) => {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
  };
  render() {
    console.log("store:", this.props.creation);
    const { blanks } = this.props.creation;

    let sorted = blanks.sort(this.comparator);
    console.log(sorted);
    // const mapped

    return (
      <div>
        <div>mapped required words</div>
        <div>mapped required words</div>
        <div>
          <NavLink to="/createselect">
            <button onClick={this.props.killStore}>Go Back</button>
          </NavLink>

          <NavLink to="/library">
            <button>button to submit template to DB</button>
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
