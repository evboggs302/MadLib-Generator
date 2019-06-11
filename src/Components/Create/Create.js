import React, { Component } from "react";
import { connect } from "react-redux";
import { setGiven, setSelected, setLines } from "../../ducks/CreationReducer";
import axios from "axios";
import { NavLink, Redirect } from "react-router-dom";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      tpyed: ""
    };
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/create/select" />;
    }
  };

  changeHandler(event) {
    let value = event.target.value;
    this.setState({
      ...this.state,
      typed: value
    });
  }

  render() {
    return (
      <div>
        <textarea
          placeholder="Start typing your story here"
          onChange={event => this.changeHandler(event)}
        />
        <div>
          {this.renderRedirect()}
          <button>Next</button>
        </div>
      </div>
    );
  }
}

class CreateSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div>use the words api here</div>;
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setGiven,
  setLines,
  setSelected
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(Create, CreateSelect);
