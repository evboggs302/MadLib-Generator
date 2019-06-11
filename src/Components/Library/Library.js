import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setStory } from "../../ducks/StoryReducer";
import { NavLink, Redirect } from "react-router-dom";

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      library: []
    };
  }
  componentDidMount() {
    this.getFullLibrary();
  }
  getFullLibrary() {
    axios.get(`/api/library`).then(res => {
      this.setState({
        ...this.state,
        library: res.data
      });
    });
  }
  setRedirect = () => {
    this.setState({
      ...this.state,
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/reqs" />;
    }
  };

  getSingleTemplate = id => {
    console.log(typeof id);
    axios.get(`/api/library/single/${id}`).then(res => {
      console.log(res.data);
      this.props.setStory(res.data);
    });
    this.setRedirect();
  };

  render() {
    console.log(this.props.user);
    console.log(this.props.story);
    console.log(this.state.library);
    const { library } = this.state;
    let mappedLibrary = library.map((e, index) => {
      return (
        <div key={index}>
          {this.renderRedirect()}
          <button onClick={() => this.getSingleTemplate(e.story_id)}>
            {e.title}
          </button>
        </div>
      );
    });
    return (
      <div>
        <h1>Your Library</h1>
        <div>{mappedLibrary}</div>
        <button>
          <NavLink to="/create">Add+</NavLink>
        </button>
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
