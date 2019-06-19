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
      this.props.setStory(res.data);
    });
    this.setRedirect();
  };

  render() {
    const { user } = this.props.user;
    return (
      <div className="home_container">
        {!user ? (
          <div className="home_container">
            <h2>Words, Bruh. Words!!</h2>
            <p>
              {"  "}Welcome to the place where the words are made up, and the
              stories don't matter. If you'd like to enjoy, and possibly create,
              more labs on this site, please login above. If you don't want to
              login, I understand. I too like to live life on the edge on
              occasion. Simply click the "Random" button below to get started.
            </p>
            <div>
              {this.renderRedirect()}
              <button
                className="home_page_buttton"
                onClick={this.getRandomTemplate}
              >
                <span>Random</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="home_container">
            <h2>
              Words,<span>{user.call_name}.</span> Words!!
            </h2>
            <p>
              {"  "}Welcome back to the place where the words are made up, and
              the stories don't matter! If you'd like to enjoy already created
              Mad Libs, click the below button to go to the "Library." If you'd
              like to create your own Mad Lib, click "Create." Want to see the
              saved stories you've previously completed? Click "History". If you
              don't feel like creating anything, but still want to laugh, hop on
              over to our "Community" page. You'll be able to see all the
              shenanigans others have been up to. If you're just feeling lucky,
              simply click "Random" to get started!
            </p>
            <div className="home_page_button_container">
              <NavLink to="/history">
                <button className="home_page_buttton">
                  <span>History</span>
                </button>
              </NavLink>
              <NavLink to="/community">
                <button className="home_page_buttton">
                  <span>Community</span>
                </button>
              </NavLink>
              <NavLink to="/create">
                <button className="home_page_buttton">
                  <span>Create</span>
                </button>
              </NavLink>
              <NavLink to="/reqs">
                <button
                  className="home_page_buttton"
                  onClick={this.getRandomTemplate}
                >
                  <span>Random</span>
                </button>
              </NavLink>
              <NavLink to="/library">
                <button className="home_page_buttton">
                  <span>Library</span>
                </button>
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
