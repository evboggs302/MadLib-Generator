import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setStory } from "../../ducks/StoryReducer";
import { NavLink } from "react-router-dom";

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
        <div key={index}>
          <NavLink to="/reqs">
            <button onClick={() => this.getSingleTemplate(story_id)}>
              {title}
            </button>
          </NavLink>
          {story_id <= 4 ? (
            []
          ) : (
            <button onClick={() => this.deleteTemplate(story_id, user_id)}>
              X
            </button>
          )}
        </div>
      );
    });
    return (
      <div>
        <h1>Your Library</h1>
        <div>{mappedLibrary}</div>
        <NavLink to="/create">
          <button>Add+</button>
        </NavLink>
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
