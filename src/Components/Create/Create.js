import React, { Component } from "react";
import { connect } from "react-redux";
import { setGiven } from "../../ducks/CreationReducer";
import axios from "axios";
import { Redirect } from "react-router-dom";

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
    this.props.setGiven(this.state.typed);
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/createselect" />;
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
        <h2>Create Your Own Story</h2>
        <p>
          In the box provided below, type out a paragraph that is no more than
          1000 characters long. Don't try to be funny just yet. We'll get to the
          funny-business in a little bit.
        </p>
        {/* "Hey man!" They were shocked! */}
        <textarea
          spellCheck
          rows="20"
          cols="60"
          wrap="hard"
          required
          maxLength="1000"
          placeholder="Start typing your story here"
          onChange={event => this.changeHandler(event)}
        />
        <div>
          {this.renderRedirect()}
          <button onClick={this.setRedirect}>Next</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setGiven
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(Create);
