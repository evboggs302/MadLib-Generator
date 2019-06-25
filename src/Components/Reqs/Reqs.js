import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { setFinal, fillBlanks } from "../../ducks/StoryReducer";
import "./Reqs.css";
import { FaBookOpen, FaHome, FaReact } from "react-icons/fa";

class Reqs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blanks: []
    };
  }

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
              <div className="req_values" key={index}>
                <input
                  placeholder={element}
                  onChange={event => this.changeHandler(event, index)}
                />
              </div>
            );
          })
        : arr;
    console.log(this.props.story.blanks);
    const { user } = this.props.user;
    return (
      <div className="req_inputs">
        <p>
          **HINT: For the best results, try to provide a mix of generic and
          specific responses to the below.**
        </p>
        <h3>{title}</h3>
        <div className="req_layout">{mappedInputs}</div>
        <div className="req_button_contain">
          <NavLink to="/">
            <button className="req homeb">
              <FaHome />
              To Home
            </button>
          </NavLink>
          {!user ? null : (
            <div>
              <NavLink to="/library">
                <button className="req library">
                  <FaBookOpen />
                  To Library
                </button>
              </NavLink>
            </div>
          )}

          <NavLink to="/story">
            <button
              className="req create"
              onClick={() => this.props.fillBlanks(this.state.blanks)}
            >
              <FaReact />
              Create Story!
            </button>
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
  setFinal,
  fillBlanks
};
const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(Reqs);
