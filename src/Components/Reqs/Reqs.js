import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { setFinal, fillBlanks } from "../../ducks/StoryReducer";
import "./Reqs.css";

class Reqs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      blanks: []
    };
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/story" />;
    }
  };

  changeHandler(event, index) {
    const { blanks } = this.state;
    blanks[index] = [event.target.value];
    this.setState({
      blanks: blanks
    });
  }

  render() {
    console.log(this.props.story);
    const { title, blanks } = this.props.story;
    let arr = blanks;
    console.log(arr);
    let mappedInputs =
      arr && arr.length
        ? arr.map((element, index) => {
            return (
              <div className="layout" key={index}>
                <input
                  placeholder={element}
                  onChange={event => this.changeHandler(event, index)}
                />
              </div>
            );
          })
        : arr;
    console.log(this.props.story.blanks);
    return (
      <div className="inputs">
        <h3 className="wordsBruh">{title}</h3>
        {mappedInputs}
        <br />

        <button
          className="createButton"
          onClick={() => this.props.fillBlanks(this.state.blanks)}
        >
          <NavLink to="/story">Create Story</NavLink>
        </button>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};
const mapDispatchToProps = {
  setFinal,
  fillBlanks
};
const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(Reqs);
