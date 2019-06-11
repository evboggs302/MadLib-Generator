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
            <h2 />
            <p />
            <div>
              {this.renderRedirect()}
              <button onClick={this.getRandomTemplate}>Random</button>
            </div>
          </div>
        ) : (
          <div>
            <div>
              {this.renderRedirect()}
              <button
                onClick={this.setRedirect}
                onClick={this.getRandomTemplate}
              >
                Random
              </button>
            </div>
            {/* <NavLink />
            <NavLink />
            <NavLink />
            <NavLink /> */}
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
