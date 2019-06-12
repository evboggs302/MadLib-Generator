import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setSelected, setBlanks, setLines } from "../../ducks/CreationReducer";
import axios from "axios";
import { NavLink, Redirect } from "react-router-dom";

class CreateSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWord: [],
      selectedWordTypes: [],
      lines: []
    };
    // this.removeDuplicates(this.state.selectedWordTypes)
  }
  //   componentWillMount() {}

  //   removeDuplicates = (arr) => {
  //       let removedDoubles = []
  //     for (let i = 0; i < arr.length; i++) {
  //         if(arr.length = 1){

  //         }
  //     }
  //   };

  getWordInfo = EventTarget => {
    const index = EventTarget.key;
    console.log(index);
    const word = EventTarget.props.children.props.children;
    console.log(word);
    const wordInfo = [word, index];

    axios
      .get(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=68c81f9b-028f-4b22-82ae-8ee40ce43404`
      )
      .then(res => {
        console.log("response from api", res.data);
        let arr = res.data;
        let types = [];
        for (let i = 0; i < arr.length; i++) {
          console.log(arr[i].fl);
          types.push(arr[i].fl);
        }
        this.setState({
          selectedWord: [...this.state.selectedWord, wordInfo],
          selectedWordTypes: [...this.state.selectedWordTypes, types]
        });
      });
  };

  render() {
    const Button = styled.button`
      border: none;
      background: none;
    `;
    console.log(this.state);
    const { given } = this.props.creation;
    const mappedCreation = given.split(" ").map((e, index) => {
      return (
        <div key={index}>
          <Button
            type="clear"
            onClick={() => this.getWordInfo(mappedCreation[index])}
          >
            {e}
          </Button>
        </div>
      );
    });
    const { selectedWord, selectedWordTypes } = this.state;
    const menu = selectedWord.map((e1, index) => {
      const options = selectedWordTypes.map((e2, index) => {
        const types = e2.map((e3, index) => {
          return <option key={index}>{e3}</option>;
        });
        return <select key={index}>{types}</select>;
      });
      return (
        <div key={index}>
          {e1[0]}
          {options}
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
        <span>
          <div>{menu}</div>
        </span>
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
