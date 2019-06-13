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
  componentDidMount() {
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
      return (
        <div key={index}>
          <NavLink to="/reqs">
            <button onClick={() => this.getSingleTemplate(e.story_id)}>
              {e.title}
            </button>
          </NavLink>
          {/* {!e.} */}
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
