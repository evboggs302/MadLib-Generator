import React, { Component } from "react";
import { connect } from "react-redux";
import { setFinal } from "../../ducks/StoryReducer";

class Story extends Component {
  componentDidMount() {
    this.toFinal();
  }

  shareToCommunity = () => {
    this.saveToUserHistory();
  };

  saveToUserHistory = () => {};

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
    console.log(this.props.story);
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
              <button>Save</button>
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
