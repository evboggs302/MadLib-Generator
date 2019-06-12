import React, { Component } from "react";
import { connect } from "react-redux";
import { setSelected, setLines } from "../../ducks/CreationReducer";
import axios from "axios";
import { NavLink, Redirect } from "react-router-dom";

class CreateSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      type: [],
      lines: []
    };
  }
  getWordInfo = selectedWord => {
    console.log(selectedWord);
    const { children } = selectedWord.props.children.props;
    axios
      .get(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${children}?key=68c81f9b-028f-4b22-82ae-8ee40ce43404`
      )
      .then(res => {
        console.log("this is response from api", res);
        //     this.setState({
        //         ...this.state,
        //         selected:;
        //   });
      });
  };
  render() {
    console.log(this.props);
    const { given } = this.props.creation;
    const mappedCreation = given.split(" ").map((e, index) => {
      return (
        <div key={index}>
          <a onClick={() => this.getWordInfo(mappedCreation[index])}>{e}</a>
        </div>
      );
    });
    return (
      <div>
        <h2>Your Story</h2>
        <div>
          <div>{mappedCreation}</div>
        </div>
        <h2>Selected Words' Type</h2>
        {/* <span> */}
        {/* <div>{mappedSelected}</div> */}
        {/* <div>{mappedType}</div> */}
        {/* </span> */}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setLines,
  setSelected
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(CreateSelect);
