import React, { Component } from "react";
import { connect } from "react-redux";
import { setFinal } from "../../ducks/StoryReducer";
import { NavLink } from "react-router-dom";
import axios from "axios";

class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      share: false
    };
  }

  componentDidMount() {
    this.toFinal();
  }

  shareStorytoCommunity = () => {
    this.setState({
      share: true
    });
    this.saveToUserHistory();
  };

  saveToUserHistory = () => {
    const { share } = this.state;
    const { title, final } = this.props.story;
    axios
      .post("/api/history/", { title: title, share: share, story: final })
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

  render() {
    console.log(this.props);
    const { story } = this.props;
    const { user } = this.props.user;
    return (
      <div>
        <p>{story.final}</p>
        <br />
        <div>
          <button>Text</button>
          <button>Email</button>
          {!user ? (
            []
          ) : (
            <div>
              <NavLink to="/">
                <button onClick={this.saveToUserHistory}>Save</button>
              </NavLink>
              <button>{`Save & Share`}</button>
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
