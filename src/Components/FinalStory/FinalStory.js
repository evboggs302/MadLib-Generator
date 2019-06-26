import React, { Component } from "react";
import { connect } from "react-redux";
import { setFinal } from "../../ducks/StoryReducer";
import { NavLink } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import { FaRegEnvelope, FaRegSave, FaHome, FaRegListAlt } from "react-icons/fa";
import "./FinalStory.css";

const socket = io.connect();

class Story extends Component {
  componentDidMount() {
    this.toFinal();
  }

  saveAndShare = () => {
    const { title, final } = this.props.story;
    axios
      .post("/api/history/", { title: title, share: true, story: final })
      .then(res => {
        console.log(res);
      });
    socket.emit("get comm");
  };

  saveToUserHistory = () => {
    const { title, final } = this.props.story;
    axios
      .post("/api/history/", { title: title, share: false, story: final })
      .then(res => {
        console.log(res);
      });
  };

  toFinal = () => {
    let finalStory = [];
    const { lines, blanks } = this.props.story;
    for (let i = 0; i < blanks.length; i++) {
      finalStory.push(lines[i], blanks[i]);
    }
    if (lines.length <= 2) {
      finalStory.push(lines[lines.length]);
    } else {
      finalStory.push(lines[lines.length - 1]);
    }
    this.props.setFinal(finalStory.join(" "));
  };

  sendEmail = (name, email, title, message) => {
    console.log(name, email, message);
    axios
      .post("/api/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: {
          name: name,
          email: email,
          title: title,
          message: message
        }
      })
      .then(res => {
        console.log(res);
        res.json();
      })
      .then(res => {
        console.log("here is the response: ", res);
      })
      .catch(err => {
        console.error("here is the error: ", err);
      });
    alert(
      "An email has been sent to the email address associated to your username. The email should be arriving in a few minutes."
    );
  };

  render() {
    console.log(this.props);
    // const { story } = this.props;
    const { final, title } = this.props.story;
    const { user } = this.props.user;
    const { call_name, email } = this.props.user.user;

    return (
      <div className="story_bucket">
        <h2>{title}</h2>
        <p>{final}</p>
        <br />
        <div className="storyinfo">
          {!user ? (
            <div>
              <NavLink to="/">
                <button className="final home">
                  <span>
                    Home <FaHome />
                  </span>
                </button>
              </NavLink>
            </div>
          ) : (
            <div>
              <NavLink to="/">
                <button className="final save" onClick={this.saveToUserHistory}>
                  <span>
                    Save <FaRegSave />
                  </span>
                </button>
              </NavLink>
              <button
                className="final email"
                onClick={() => this.sendEmail(call_name, email, title, final)}
              >
                <span>
                  Email <FaRegEnvelope />
                </span>
              </button>
              <NavLink to="/library">
                <button className="final share" onClick={this.saveAndShare}>
                  <span>
                    {`Save & Share`} <FaRegListAlt />
                  </span>
                </button>
              </NavLink>
              <NavLink to="/">
                <button className="req home">
                  <span>
                    Home <FaHome />
                  </span>
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return reduxState;
};
const mapDispatchToProps = {
  setFinal
};
const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(Story);
