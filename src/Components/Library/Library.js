import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setStory } from "../../ducks/StoryReducer";
import { NavLink } from "react-router-dom";
import {
  FaRegEnvelope,
  FaRegSave,
  FaTrashAlt,
  FaRegPlusSquare,
  FaBookOpen,
  FaHome,
  FaRegCalendar,
  FaRegListAlt,
  FaReact,
  FaRandom
} from "react-icons/fa";
import "./Library.css";

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      library: []
    };
  }
  componentWillMount() {
    this.getFullLibrary();
  }
  getFullLibrary() {
    axios.get(`/api/library`).then(res => {
      console.log(res.data);
      this.setState({
        ...this.state,
        library: res.data
      });
    });
  }

  deleteTemplate = (story, user) => {
    axios.delete(`/api/library/${user}?story=${story}`).then(res => {
      console.log(res.data);
      this.setState({
        ...this.state,
        library: res.data
      });
    });
  };

  getSingleTemplate = id => {
    console.log(typeof id);
    axios.get(`/api/library/single/${id}`).then(res => {
      console.log(res.data);
      this.props.setStory(res.data);
    });
  };

  render() {
    console.log(this.props.user);
    console.log(this.props.story);
    console.log(this.state.library);
    const { library } = this.state;
    let mappedLibrary = library.map((e, index) => {
      const { title, story_id } = e;
      const { user_id } = this.props.user.user;
      return (
        <div id="book" key={index}>
          <NavLink to="/reqs">
            <button
              id="pageBut"
              onClick={() => this.getSingleTemplate(story_id)}
            >
              {title}
            </button>
          </NavLink>
          {story_id <= 4 ? (
            []
          ) : (
            <button
              id="bomb"
              onClick={() => this.deleteTemplate(story_id, user_id)}
            >
              <i>
                <FaTrashAlt size="fa-lg" />
              </i>
            </button>
          )}
        </div>
      );
    });
    return (
      <div className="libraryContainer">
        <h1>Your Library</h1>
        <span>
          <div className="liby">{mappedLibrary}</div>
          <div id="libButContainer">
            <div id="libyBut">
              <NavLink to="/create">
                <button id="square">
                  Create Template!
                  <i>
                    <FaReact />
                  </i>
                </button>
              </NavLink>
            </div>
            <div id="libyBut">
              <NavLink to="/">
                <button className="home">Back</button>
              </NavLink>
            </div>
          </div>
        </span>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setStory
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(Library);
