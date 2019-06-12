import React, { Component } from "react";
import { connect } from "react-redux";
import { setStory } from "../../ducks/StoryReducer";
import axios from "axios";
import { NavLink, Redirect } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/reqs" />;
    }
  };

  getRandomTemplate = () => {
    const id = Math.floor(Math.random() * 4) + 1;
    axios.get(`/api/library/random/${id}`).then(res => {
      console.log(res.data);
      this.props.setStory(res.data);
    });
    this.setRedirect();
  };

  render() {
    console.log(this.props.user);
    console.log(this.props.story);
    const { user } = this.props.user;
    return (
      <div>
        {!user ? (
          <div>
            <h2>Words, Bruh. Words!!</h2>
            <p>
              {" "}
              Welcome to the place where the words are made up, and the stories
              don't matter. If you'd like to enjoy, and possibly create, more
              labs on this site, please login above. If you don't want to login,
              I understand. I too like to live life on the edge on occasion.
              Simply click the "Random" button below to get started.
            </p>
            <div>
              {this.renderRedirect()}
              <button onClick={this.getRandomTemplate}>Random</button>
            </div>
          </div>
        ) : (
          <div>
            <h2>Words, {user.call_name}. Words!!</h2>
            <p>
              {" "}
              Welcome back to the place where the words are made up, and the
              stories don't matter! If you'd like to enjoy already created Mad
              Libs, click the below button to go to the "Library." If you'd like
              to create your own Mad Lib, click "Create." Want to see the saved
              stories you've previously completed? Click "History". If you don't
              feel like creating anything, but still want to laugh, hop on over
              to our "Community" page. You'll be able to see all the shenanigans
              others have been up to. If you're just feeling lucky, simply click
              "Random" to get started!
            </p>
            <div>
              {this.renderRedirect()}
              <button
                onClick={this.setRedirect}
                onClick={this.getRandomTemplate}
              >
                Random
              </button>

              <NavLink to="/library">
                <button>Library</button>
              </NavLink>

              <NavLink to="/create">
                <button>Create</button>
              </NavLink>

              <NavLink to="/history">
                <button>History</button>
              </NavLink>

              <NavLink to="/community">
                <button>Community</button>
              </NavLink>
            </div>
          </div>
        )}
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
export default invokedConnect(Home);
